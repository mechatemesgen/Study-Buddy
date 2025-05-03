import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  fetchSession,
  joinSession,
  leaveSession,
} from "@/api/sessions";
import { formatDate, formatTime } from "@/lib/utils";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  FileText,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";

export default function SessionDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const { toast } = useToast();
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const sessionData = await fetchSession(id);
        setSession(sessionData);
      } catch (error) {
        toast({
          title: "Error loading session",
          description:
            "There was a problem loading the session details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadSession();
    }
  }, [id, toast]);

  const handleJoinSession = async () => {
    setIsJoining(true);
    try {
      const result = await joinSession(id);
      if (result.success) {
        setSession(result.session);
        toast({
          title: "Joined session",
          description:
            "You have successfully joined this study session.",
        });
      } else {
        toast({
          title: "Failed to join session",
          description:
            result.error ||
            "There was an error joining the session. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to join session",
        description:
          "There was an error joining the session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsJoining(false);
    }
  };

  const handleLeaveSession = async () => {
    setIsLeaving(true);
    try {
      const result = await leaveSession(id);
      if (result.success) {
        setSession((prev) => ({
          ...prev,
          attendees: prev.attendees.filter(
            (a) => a.id !== "1"
          ), // Current user ID
        }));
        toast({
          title: "Left session",
          description:
            "You have successfully left this study session.",
        });
      } else {
        toast({
          title: "Failed to leave session",
          description:
            result.error ||
            "There was an error leaving the session. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to leave session",
        description:
          "There was an error leaving the session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLeaving(false);
    }
  };

  const isUserAttending = session?.attendees.some(
    (a) => a.id === "1"
  ); // Current user ID
  const isUserHost = session?.attendees.some(
    (a) => a.id === "1" && a.isHost
  ); // Current user ID and is host
  const isFull =
    session?.maxAttendees &&
    session.attendees.length >= session.maxAttendees;
  const isPast = session && new Date(session.end) < new Date();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">
              Loading session details...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!session) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">
            Session not found
          </h2>
          <p className="text-gray-500 mt-2">
            The study session you're looking for doesn't exist or
            you don't have access.
          </p>
          <Button
            className="mt-4"
            onClick={() => navigate("/dashboard/sessions")}
          >
            Back to Sessions
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">{session.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">
                    {session.groupName}
                  </CardTitle>
                  <CardDescription>Study Session</CardDescription>
                </div>
                <div>
                  {isPast ? (
                    <Badge variant="outline">Completed</Badge>
                  ) : (
                    <Badge className="bg-green-500">
                      Upcoming
                    </Badge>
                  )}
                  {session.isVirtual && (
                    <Badge variant="outline" className="ml-2">
                      Virtual
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>{formatDate(session.start)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>
                    {formatTime(session.start)} -{" "}
                    {formatTime(session.end)}
                  </span>
                </div>
                {session.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{session.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>
                    {session.attendees.length} attendee
                    {session.attendees.length !== 1 && "s"}
                    {session.maxAttendees &&
                      ` (max ${session.maxAttendees})`}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">
                  Description
                </h3>
                <p className="text-muted-foreground">
                  {session.description}
                </p>
              </div>

              {session.agenda && session.agenda.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Agenda</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {session.agenda.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {session.isVirtual && session.meetingLink && (
                <div className="mt-4">
                  <Button variant="outline" className="gap-2" asChild>
                    <a
                      href={session.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Video className="h-4 w-4" />
                      Join Virtual Meeting
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button
                variant="outline"
                onClick={() =>
                  navigate(`/dashboard/groups/${session.groupId}`)
                }
              >
                View Group
              </Button>
              {!isPast && (
                <>
                  {isUserAttending ? (
                    <Button
                      variant="destructive"
                      onClick={handleLeaveSession}
                      disabled={isLeaving || isUserHost}
                    >
                      {isLeaving ? "Leaving..." : "Leave Session"}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleJoinSession}
                      disabled={isJoining || isFull}
                    >
                      {isJoining
                        ? "Joining..."
                        : isFull
                        ? "Session Full"
                        : "Join Session"}
                    </Button>
                  )}
                </>
              )}
            </CardFooter>
          </Card>

          <Tabs defaultValue="materials" className="space-y-4">
            <TabsList>
              <TabsTrigger value="materials">
                Study Materials
              </TabsTrigger>
              <TabsTrigger value="notes">Session Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="materials">
              <Card>
                <CardHeader>
                  <CardTitle>Study Materials</CardTitle>
                  <CardDescription>
                    Resources shared for this study session
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {session.materials && session.materials.length > 0 ? (
                    <div className="space-y-4">
                      {session.materials.map((material) => (
                        <div
                          key={material.id}
                          className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <FileText className="h-10 w-10 text-blue-500" />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate">
                              {material.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {material.type.toUpperCase()}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Resource
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        No materials yet
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        No study materials have been shared for this
                        session yet.
                      </p>
                      {isUserHost && (
                        <Button>Add Study Materials</Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Session Notes</CardTitle>
                  <CardDescription>
                    Notes and takeaways from this study session
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {session.notes ? (
                    <div className="prose max-w-none">
                      <p>{session.notes}</p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        No notes yet
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {isPast
                          ? "No notes were added for this session."
                          : "Notes will be available after the session."}
                      </p>
                      {isPast && isUserHost && (
                        <Button>Add Session Notes</Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendees</CardTitle>
              <CardDescription>
                {session.attendees.length} of{" "}
                {session.maxAttendees || "∞"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {session.attendees.map((attendee) => (
                  <div
                    key={attendee.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={attendee.avatar || ""}
                          alt={attendee.name}
                        />
                        <AvatarFallback>
                          {attendee.name
                            .substring(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {attendee.name}
                        </p>
                        {attendee.isHost && (
                          <Badge
                            variant="outline"
                            className="text-xs"
                          >
                            Host
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {isUserHost && !isPast && (
            <Card>
              <CardHeader>
                <CardTitle>Host Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">Edit Session</Button>
                <Button variant="outline" className="w-full">
                  Manage Attendees
                </Button>
                <Button variant="destructive" className="w-full">
                  Cancel Session
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}