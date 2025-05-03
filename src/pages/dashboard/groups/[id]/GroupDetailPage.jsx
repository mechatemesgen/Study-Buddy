import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StudyCalendar } from "@/components/StudyCalendar"
import { ResourceList } from "@/components/ResourceList"
import { MemberList } from "@/components/MemberList"
import { SessionScheduler } from "@/components/SessionScheduler"
import { ResourceUploader } from "@/components/ResourceUploader"
import { useGroupSessions } from "@/hooks/use-group-sessions"
import { useGroupResources } from "@/hooks/use-group-resources"
import { fetchGroup } from "@/api/groups"
import { toast } from "@/components/ui/toast"

export default function GroupDetailPage() {
  const { id } = useParams()
  const [group, setGroup] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { sessions } = useGroupSessions(id)
  const { resources } = useGroupResources(id)
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false)
  const [isUploaderOpen, setIsUploaderOpen] = useState(false)

  useEffect(() => {
    const loadGroupData = async () => {
      try {
        const groupData = await fetchGroup(id)
        setGroup(groupData)
      } catch (error) {
        toast({
          title: "Error loading group",
          description: "There was a problem loading the group details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      loadGroupData()
    }
  }, [id, toast])

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Loading group details...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!group) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Group not found</h2>
          <p className="text-gray-500 mt-2">
            The study group you're looking for doesn't exist or you don't have access.
          </p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={group.avatar || ""} alt={group.name} />
            <AvatarFallback>{group.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{group.name}</h1>
            <p className="text-gray-500">{group.description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsSchedulerOpen(true)}>Schedule Session</Button>
          <Button variant="outline" onClick={() => setIsUploaderOpen(true)}>
            Upload Resource
          </Button>
        </div>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Group Calendar</CardTitle>
              <CardDescription>View and manage study sessions for this group</CardDescription>
            </CardHeader>
            <CardContent>
              <StudyCalendar events={sessions} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources" className="space-y-4">
          <ResourceList resources={resources} />
        </TabsContent>
        <TabsContent value="members" className="space-y-4">
          <MemberList members={group.members} />
        </TabsContent>
      </Tabs>

      <SessionScheduler groupId={id} open={isSchedulerOpen} onOpenChange={setIsSchedulerOpen} />

      <ResourceUploader groupId={id} open={isUploaderOpen} onOpenChange={setIsUploaderOpen} />
    </DashboardLayout>
  )
}
