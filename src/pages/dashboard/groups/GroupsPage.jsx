import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/Badge";
import { CreateGroupDialog } from "@/components/CreateGroupDialog";
import { useGroups } from "@/hooks/use-groups";
import { Users, Search, Plus, MessageSquare, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function GroupsPage() {
  const { groups, isLoading } = useGroups();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  const filteredGroups = searchQuery
    ? groups?.filter(
        (group) =>
          group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : groups;

  const groupedBySubject = filteredGroups?.reduce((acc, group) => {
    const subject = group.subject || "Other";
    if (!acc[subject]) acc[subject] = [];
    acc[subject].push(group);
    return acc;
  }, {});

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Study Groups</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search groups..."
              className="pl-8 w-full md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsCreateGroupOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Group
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Groups</TabsTrigger>
          <TabsTrigger value="my">My Groups</TabsTrigger>
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
        </TabsList>

        {/* All Groups */}
        <TabsContent value="all">
          <GroupsContent
            isLoading={isLoading}
            groups={filteredGroups}
            emptyMessage="No study groups available."
            onCreateGroup={() => setIsCreateGroupOpen(true)}
          />
        </TabsContent>

        {/* My Groups — currently same as all; implement filtering logic if needed */}
        <TabsContent value="my">
          <GroupsContent
            isLoading={isLoading}
            groups={filteredGroups}
            emptyMessage="You haven't joined any study groups yet."
            onCreateGroup={() => setIsCreateGroupOpen(true)}
          />
        </TabsContent>

        {/* Groups By Subject */}
        <TabsContent value="subjects">
          {isLoading ? (
            <LoadingState message="Loading groups by subject..." />
          ) : groupedBySubject && Object.keys(groupedBySubject).length > 0 ? (
            Object.entries(groupedBySubject).map(([subject, subjectGroups]) => (
              <div key={subject} className="space-y-4">
                <h2 className="text-xl font-bold">{subject}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subjectGroups.map((group) => (
                    <GroupCard key={group.id} group={group} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <EmptyState message="No study groups found." onCreateGroup={() => setIsCreateGroupOpen(true)} />
          )}
        </TabsContent>
      </Tabs>

      <CreateGroupDialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen} />
    </DashboardLayout>
  );
}

function GroupsContent({ isLoading, groups, emptyMessage, onCreateGroup }) {
  if (isLoading) return <LoadingState />;
  if (!groups || groups.length === 0) return <EmptyState message={emptyMessage} onCreateGroup={onCreateGroup} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
}

function LoadingState({ message = "Loading groups..." }) {
  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p className="mt-4 text-lg">{message}</p>
    </div>
  );
}

function EmptyState({ message, onCreateGroup }) {
  return (
    <div className="text-center py-12">
      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-xl font-medium mb-2">No groups found</h3>
      <p className="text-muted-foreground mb-6">{message}</p>
      <Button onClick={onCreateGroup}>Create a Study Group</Button>
    </div>
  );
}

function GroupCard({ group }) {
  const inviteLink = `${window.location.origin}/invite/${group.id}`;
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success("Invite link copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy the invite link.");
    });
  };

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
              <AvatarFallback>{group.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg truncate">{group.name}</CardTitle>
                {group.isNew && (
                  <Badge variant="outline" className="text-xs">New</Badge>
                )}
              </div>
              <CardDescription>{group.subject}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{group.description}</p>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              {group.memberCount} members
            </div>
            <div>Last active: {group.lastActivity}</div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Button asChild className="flex-1">
              <Link to={`/dashboard/groups/${group.id}`}>View Group</Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link to={`/dashboard/groups/${group.id}/chat`}>
                <MessageSquare className="h-4 w-4" />
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsInviteModalOpen(true)}>Invite Members</DropdownMenuItem>
                <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Leave Group</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* ✅ MOVE DIALOG OUTSIDE OF CARD */}
      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent>
          <DialogTitle>Invite Members to {group.name}</DialogTitle>
          <div className="mb-4">
            <span className="text-sm text-muted-foreground mb-2 block">Invite Link:</span>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                value={inviteLink}
                readOnly
                className="w-full md:w-[250px] lg:w-[300px] text-sm"
              />
              <Button variant="outline" onClick={handleCopyInvite} size="sm">
                Copy Link
              </Button>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
