import { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"

import { Card } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/toast"

const localizer = momentLocalizer(moment)

export function StudyCalendar({ events = [] }) {
  const { toast } = useToast()
  const [calendarEvents, setCalendarEvents] = useState([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (events.length > 0) {
      setCalendarEvents(events)
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
    toast({
      title: event.title,
      description: event.description || "No description provided",
    })
  }

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
          />
        </div>
      </CardContent>
    </Card>
  )
}
