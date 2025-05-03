import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../Button" 
import { Badge } from "../Badge"
import { Skeleton } from "../Skeleton" // Same for Skeleton
import { Calendar, Clock, Video, CalendarIcon, Plus } from "lucide-react"
import { formatDate, formatTime } from "../../lib/utils" // Assuming 

export function SessionsSection({ sessions = [], isLoading }) {
  if (isLoading) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
          <div>
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
        <div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-3 rounded-lg border">
                <div className="flex justify-between mb-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Get today's date at midnight for comparison
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Get date 7 days from now at midnight
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)

  // Filter sessions for the next 7 days
  const upcomingSessions = sessions
    ? sessions
        .filter((session) => {
          const sessionDate = new Date(session.start)
          return sessionDate >= today && sessionDate < nextWeek
        })
        .sort((a, b) => new Date(a.start) - new Date(b.start))
    : []

  return (
    <div className="card space-y-6 md:space-y-8 lg:space-y-10">
      <div className="card-header">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <span className="text-lg font-semibold">Upcoming Sessions</span>
          <Button size="sm" asChild className="mt-2 md:mt-0">
            <Link to="/dashboard/sessions/schedule">
              <Plus className="h-4 w-4 mr-1" /> Schedule
            </Link>
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">Your study sessions for the next 7 days</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {upcomingSessions.length > 0 ? (
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No upcoming sessions</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              No upcoming sessions scheduled for the next 7 days. Schedule a new study session to get started.
            </p>
            <Button asChild className="mt-4">
              <Link to="/dashboard/sessions/schedule">Schedule a Session</Link>
            </Button>
          </div>
        )}
        {upcomingSessions.length > 0 && (
          <div className="hidden lg:block">
            <Calendar />
          </div>
        )}
      </div>
      {upcomingSessions.length > 0 && (
        <div>
          <Button variant="outline" asChild className="w-full mt-4">
            <Link to="/dashboard/sessions">View All Sessions</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

function SessionCard({ session }) {
  // Check if session is today
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const sessionDate = new Date(session.start)
  sessionDate.setHours(0, 0, 0, 0)

  const isToday = sessionDate.getTime() === today.getTime()

  // Check if session is happening now
  const now = new Date()
  const isNow = now >= new Date(session.start) && now <= new Date(session.end)

  return (
    <div className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <Link to={`/dashboard/sessions/${session.id}`} className="font-medium hover:underline">
          {session.title}
        </Link>
        <div>
          {isNow && <Badge className="bg-green-500">Live Now</Badge>}
          {isToday && !isNow && <Badge variant="outline">Today</Badge>}
        </div>
      </div>
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center">
          <CalendarIcon className="h-3.5 w-3.5 mr-2" />
          <span>{isToday ? "Today" : formatDate(session.start)}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-3.5 w-3.5 mr-2" />
          <span>
            {formatTime(session.start)} - {formatTime(session.end)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs">{session.groupName}</span>
          {session.isVirtual && (
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
              <Video className="h-3 w-3" />
              Join
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
