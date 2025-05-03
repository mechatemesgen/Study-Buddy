import { useState } from "react"
import { Link } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Search, Plus, Video, Users } from "lucide-react"
import { useSessions } from "@/hooks/use-sessions"
import { formatDate, formatTime } from "@/lib/utils"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { StudyCalendar } from "@/components/study-calendar"

export default function SessionsPage() {
  const { sessions, isLoading } = useSessions()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Filter sessions based on search query
  const filteredSessions = searchQuery
    ? sessions?.filter(
        (session) =>
          session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          session.groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (session.description && session.description.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : sessions

  // Get today's date at midnight for comparison
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Filter upcoming sessions (today and future)
  const upcomingSessions = filteredSessions
    ? filteredSessions
        .filter((session) => new Date(session.start) >= today)
        .sort((a, b) => new Date(a.start) - new Date(b.start))
    : []

  // Filter past sessions
  const pastSessions = filteredSessions
    ? filteredSessions
        .filter((session) => new Date(session.start) < today)
        .sort((a, b) => new Date(b.start) - new Date(a.start))
    : []

  // Filter sessions for the selected date
  const selectedDateSessions = filteredSessions
    ? filteredSessions.filter((session) => {
        const sessionDate = new Date(session.start)
        return (
          sessionDate.getDate() === selectedDate.getDate() &&
          sessionDate.getMonth() === selectedDate.getMonth() &&
          sessionDate.getFullYear() === selectedDate.getFullYear()
        )
      })
    : []

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Study Sessions</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search sessions..."
              className="pl-8 w-full md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button asChild>
            <Link to="/dashboard/sessions/schedule">
              <Plus className="h-4 w-4 mr-2" /> Schedule Session
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="calendar" className="space-y-6">
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="date">By Date</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Study Calendar</CardTitle>
              <CardDescription>View and manage your study schedule</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-lg">Loading calendar...</p>
                </div>
              ) : (
                <StudyCalendar events={sessions || []} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg">Loading upcoming sessions...</p>
            </div>
          ) : upcomingSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No upcoming sessions</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? "No sessions match your search criteria."
                  : "You don't have any upcoming study sessions scheduled."}
              </p>
              <Button asChild>
                <Link to="/dashboard/sessions/schedule">Schedule a Session</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg">Loading past sessions...</p>
            </div>
          ) : pastSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastSessions.map((session) => (
                <SessionCard key={session.id} session={session} isPast />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No past sessions</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "No sessions match your search criteria." : "You don't have any past study sessions."}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="date" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>Choose a date to view sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date || new Date())}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sessions on {formatDate(selectedDate)}</CardTitle>
                <CardDescription>Study sessions scheduled for this date</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-lg">Loading sessions...</p>
                  </div>
                ) : selectedDateSessions.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateSessions.map((session) => (
                      <div key={session.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <Link to={`/dashboard/sessions/${session.id}`} className="font-medium hover:underline">
                            {session.title}
                          </Link>
                          {session.isVirtual && <Badge variant="outline">Virtual</Badge>}
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-2" />
                            <span>
                              {formatTime(session.start)} - {formatTime(session.end)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3.5 w-3.5 mr-2" />
                            <span>
                              {typeof session.attendees === "number"
                                ? `${session.attendees} attendees`
                                : `${session.attendees?.length || 0} attendees`}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>{session.groupName}</span>
                            {session.isVirtual && (
                              <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                                <Video className="h-3 w-3" />
                                Join
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No sessions on this date</h3>
                    <p className="text-muted-foreground mb-6">
                      There are no study sessions scheduled for {formatDate(selectedDate)}.
                    </p>
                    <Button asChild>
                      <Link to="/dashboard/sessions/schedule">Schedule a Session</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

function SessionCard({ session, isPast = false }) {
  // Check if session is today
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const sessionDate = new Date(session.start)
  sessionDate.setHours(0, 0, 0, 0)

  const isToday = sessionDate.getTime() === today.getTime()

  // Check if session is happening now
  const now = new Date()
  const isNow = !isPast && now >= new Date(session.start) && now <= new Date(session.end)

  return (
    <Card className={isPast ? "opacity-75" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{session.title}</CardTitle>
          <div>
            {isNow && <Badge className="bg-green-500">Live Now</Badge>}
            {isToday && !isNow && !isPast && <Badge variant="outline">Today</Badge>}
            {session.isVirtual && (
              <Badge variant="outline" className="ml-2">
                Virtual
              </Badge>
            )}
          </div>
        </div>
        <CardDescription>{session.groupName}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>{formatDate(session.start)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>
              {formatTime(session.start)} - {formatTime(session.end)}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            <span>
              {typeof session.attendees === "number"
                ? `${session.attendees} attendees`
                : `${session.attendees?.length || 0} attendees`}
            </span>
          </div>
          {session.description && <p className="mt-2">{session.description}</p>}
        </div>
        <div className="flex gap-2 mt-4">
          <Button asChild className="flex-1">
            <Link to={`/dashboard/sessions/${session.id}`}>{isPast ? "View Details" : "View Session"}</Link>
          </Button>
          {!isPast && session.isVirtual && (
            <Button variant="outline" className="gap-1">
              <Video className="h-4 w-4" />
              Join
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}