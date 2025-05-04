import { useState } from "react";
import { Link } from "react-router-dom"; 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"; 
import { Button } from "../Button"; 
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"; 
import { Badge } from "../Badge"; 
import { Skeleton } from "../Skeleton";
import { Users, Plus, MessageSquare, MoreHorizontal } from "lucide-react"; 
import { CreateGroupDialog } from "../CreateGroupDialog"; // Adjust import path
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"; 

export function GroupsSection({ groups = [], isLoading }) {
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-48" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-lg border">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Study Groups</span>
          <Button size="sm" onClick={() => setIsCreateGroupOpen(true)}>
            <Plus className="h-4 w-4 mr-1" /> New Group
          </Button>
        </CardTitle>
        <CardDescription>Your active study groups and communities</CardDescription>
      </CardHeader>
      <CardContent>
        {groups && groups.length > 0 ? (
          <div className="space-y-4">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No study groups yet</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              You are not part of any study groups yet. Join an existing group or create a new one.
            </p>
            <Button onClick={() => setIsCreateGroupOpen(true)}>Create Study Group</Button>
          </div>
        )}
      </CardContent>
      {groups && groups.length > 0 && (
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link to="/dashboard/groups">View All Groups</Link>
          </Button>
        </CardFooter>
      )}
      <CreateGroupDialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen} />
    </Card>
  );
}

function GroupCard({ group }) {
  const [copySuccess, setCopySuccess] = useState("");
  
  // Function to handle copying the link to clipboard
  const handleCopyLink = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopySuccess("Link copied!");  // Set success message
        setTimeout(() => setCopySuccess(""), 3000);  // Hide the message after 3 seconds
      })
      .catch(() => setCopySuccess("Failed to copy link"));
  };

  // Generate an invitation link (This is just a placeholder URL for now)
  const invitationLink = `https://yourwebsite.com/invite/${group.id}`;

  return (
    <div className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
      <Avatar className="h-10 w-10">
        <AvatarImage src={group.avatar || ""} alt={group.name} />
        <AvatarFallback>{group.name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Link to={`/dashboard/groups/${group.id}`} className="font-medium hover:underline truncate">
            {group.name}
          </Link>
          {group.isNew && (
            <Badge variant="outline" className="text-xs">
              New
            </Badge>
          )}
        </div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          <Users className="h-3 w-3 mr-1" />
          <span>{group.memberCount} members</span>
          {group.lastActivity && (
            <>
              <span className="mx-1">•</span>
              <span>Last active {group.lastActivity}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
          <Link to={`/dashboard/groups/${group.id}/chat`}>
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">Group chat</span>
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleCopyLink(invitationLink)}>
              Invite Members
            </DropdownMenuItem>
            <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Leave Group</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Display success message */}
      {copySuccess && (
        <p className="mt-2 text-green-500 text-sm">{copySuccess}</p>
      )}
    </div>
  );
}
