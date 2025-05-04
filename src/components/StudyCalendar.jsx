import { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useNavigate } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/toast"

const localizer = momentLocalizer(moment)

export function StudyCalendar({ events = [] }) {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [calendarEvents, setCalendarEvents] = useState([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    if (events && events.length > 0) {
      // Format events from API to calendar format
      const formattedEvents = events.map(event => {
        // Convert string dates to Date objects if needed
        const start = typeof event.start === 'string' ? new Date(event.start) : event.start;
        const end = typeof event.end === 'string' ? new Date(event.end) : event.end;
        
        return {
          id: event.id,
          title: event.title,
          start,
          end,
          description: event.description || '',
          location: event.location || '',
          groupId: event.groupId || event.group_id,
          groupName: event.groupName || event.group_name,
          isVirtual: event.isVirtual || event.is_virtual || false,
          meetingLink: event.meetingLink || event.meeting_link || '',
          attendees: event.attendees || [],
          resource: event, // Store the original resource for reference
        };
      });
      
      setCalendarEvents(formattedEvents)
    }
  }, [events])

  if (!isMounted) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading calendar...</p>
        </div>
      </div>
    )
  }

  const handleEventClick = (event) => {
    // Navigate to the session detail page when an event is clicked
    navigate(`/dashboard/sessions/${event.id}`);
  }

  // Custom event styling
  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: '#3b82f6', // Default blue color
      borderRadius: '4px',
      color: 'white',
      border: 'none',
      display: 'block',
    };
    
    // Different colors based on group or virtual status
    if (event.isVirtual) {
      style.backgroundColor = '#8b5cf6'; // Purple for virtual sessions
    } else if (event.groupId) {
      // Generate a color based on the group ID for consistency
      const groupColors = {
        1: '#10b981', // Green
        2: '#f59e0b', // Amber
        3: '#ef4444', // Red
        4: '#06b6d4', // Cyan
        5: '#8b5cf6', // Purple
      };
      
      // Use the group ID to select a color or fall back to the default
      if (event.groupId in groupColors) {
        style.backgroundColor = groupColors[event.groupId];
      } else {
        // Create a deterministic color based on the group ID string
        const hash = Array.from(String(event.groupId))
          .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
        
        const hue = hash % 360;
        style.backgroundColor = `hsl(${hue}, 70%, 50%)`;
      }
    }
    
    return { style };
  };

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <div className="h-[600px]">
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            onSelectEvent={handleEventClick}
            views={["month", "week", "day", "agenda"]}
            eventPropGetter={eventStyleGetter}
            tooltipAccessor={(event) => `${event.title}\n${event.description || ''}`}
          />
        </div>
      </CardContent>
    </Card>
  )
}
