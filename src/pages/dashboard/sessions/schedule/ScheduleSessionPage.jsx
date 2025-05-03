import { useState } from "react"
import { useHistory } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useGroups } from "@/hooks/use-groups"
import { scheduleSession } from "@/api/sessions"
import { CalendarIcon, Clock, ArrowLeft } from "lucide-react"
import { cn, formatDate } from "@/lib/utils"

export default function ScheduleSessionPage() {
  const history = useHistory()
  const { toast } = useToast()
  const { groups } = useGroups()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    groupId: "",
    date: new Date(),
    startTime: "",
    endTime: "",
    isVirtual: true,
    maxAttendees: "",
    location: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({ ...prev, isVirtual: checked }))
  }

  const handleDateSelect = (date) => {
    setFormData((prev) => ({ ...prev, date }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form
      if (!formData.title || !formData.groupId || !formData.date || !formData.startTime || !formData.endTime) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Create date objects for start and end times
      const startDateTime = new Date(formData.date)
      const [startHours, startMinutes] = formData.startTime.split(":").map(Number)
      startDateTime.setHours(startHours, startMinutes, 0)

      const endDateTime = new Date(formData.date)
      const [endHours, endMinutes] = formData.endTime.split(":").map(Number)
      endDateTime.setHours(endHours, endMinutes, 0)

      // Validate that end time is after start time
      if (endDateTime <= startDateTime) {
        toast({
          title: "Invalid time range",
          description: "End time must be after start time.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Schedule the session
      await scheduleSession({
        title: formData.title,
        description: formData.description,
        groupId: formData.groupId,
        start: startDateTime,
        end: endDateTime,
        isVirtual: formData.isVirtual,
        maxAttendees: formData.maxAttendees ? Number.parseInt(formData.maxAttendees) : undefined,
        location: formData.location,
      })

      toast({
        title: "Session scheduled",
        description: "Your study session has been scheduled successfully.",
      })

      // Redirect to sessions page
      history.push("/dashboard/sessions")
    } catch (error) {
      toast({
        title: "Failed to schedule session",
        description: "There was an error scheduling your study session. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => history.goBack()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Schedule a Study Session</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
            <CardDescription>Fill in the details to schedule a new study session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Session Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Midterm Review"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="What will you cover in this session?"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="groupId">
                    Study Group <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.groupId}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, groupId: value }))}
                    required
                  >
                    <SelectTrigger id="groupId">
                      <SelectValue placeholder="Select a study group" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups?.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    Date <span className="text-destructive">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? formatDate(formData.date) : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={formData.date} onSelect={handleDateSelect} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">
                      Start Time <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startTime"
                        name="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">
                      End Time <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="endTime"
                        name="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between space-y-0 pt-2">
                  <Label htmlFor="isVirtual">Virtual Session</Label>
                  <Switch id="isVirtual" checked={formData.isVirtual} onCheckedChange={handleSwitchChange} />
                </div>

                {!formData.isVirtual && (
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g., Library Study Room 3"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="maxAttendees">Maximum Attendees</Label>
                  <Input
                    id="maxAttendees"
                    name="maxAttendees"
                    type="number"
                    min="1"
                    placeholder="Leave blank for unlimited"
                    value={formData.maxAttendees}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={isLoading} isLoading={isLoading}>
              Schedule Session
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardLayout>
  )
}
