import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CreateGroupDialog } from "@/components/create-group-dialog";
import { useGroups } from "@/hooks/use-groups";
import { Users, Search, Plus, MessageSquare, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function GroupsPage() {
  const { groups, isLoading } = useGroups();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  // Filter groups based on search query
  const filteredGroups = searchQuery
    ? groups?.filter(
        (group) =>
          group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : groups;

  // Group by subject
  const groupedBySubject = filteredGroups?.reduce((acc, group) => {
    const subject = group.subject || "Other";
    if (!acc[subject]) {
      acc[subject] = [];
    }
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
            <Plus className="h-4 w-4 mr-2" /> Create Group
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Groups</TabsTrigger>
          <TabsTrigger value="my">My Groups</TabsTrigger>
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg">Loading groups...</p>
            </div>
          ) : filteredGroups && filteredGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No groups found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "No groups match your search criteria." : "You haven't joined any study groups yet."}
              </p>
              <Button onClick={() => setIsCreateGroupOpen(true)}>Create a Study Group</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="my" className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg">Loading your groups...</p>
            </div>
          ) : filteredGroups && filteredGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No groups found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "No groups match your search criteria." : "You haven't joined any study groups yet."}
              </p>
              <Button onClick={() => setIsCreateGroupOpen(true)}>Create a Study Group</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg">Loading groups by subject...</p>
            </div>
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
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No groups found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "No groups match your search criteria." : "No study groups available."}
              </p>
              <Button onClick={() => setIsCreateGroupOpen(true)}>Create a Study Group</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <CreateGroupDialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen} />
    </DashboardLayout>
  );
}

function GroupCard({ group }) {
  return (
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
                <Badge variant="outline" className="text-xs">
                  New
                </Badge>
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
              <span className="sr-only">Group chat</span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Invite Members</DropdownMenuItem>
              <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Leave Group</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}