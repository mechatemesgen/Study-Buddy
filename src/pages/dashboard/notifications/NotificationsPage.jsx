import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, CheckCircle, Calendar, MessageSquare, FileText, Users } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setTimeout(() => {
        const mockNotifications = [
          {
            id: "1",
            type: "session_reminder",
            title: "Session Reminder",
            message: "Calculus Study Session starts in 30 minutes",
            timestamp: "10 minutes ago",
            read: false,
            link: "/dashboard/sessions/1",
          },
          {
            id: "2",
            type: "new_message",
            title: "New Message",
            message: "Sarah posted a new message in Computer Science 101",
            timestamp: "1 hour ago",
            read: false,
            link: "/dashboard/groups/2/chat",
          },
          {
            id: "3",
            type: "resource_update",
            title: "New Resource",
            message: 'Michael uploaded "Midterm Practice Problems" to Calculus Study Group',
            timestamp: "3 hours ago",
            read: true,
            link: "/dashboard/resources/2",
          },
          {
            id: "4",
            type: "group_invite",
            title: "Group Invitation",
            message: 'You have been invited to join "Physics 202" study group',
            timestamp: "Yesterday",
            read: true,
            link: "/dashboard/groups/invites",
          },
          {
            id: "5",
            type: "session_reminder",
            title: "Session Reminder",
            message: "Programming Practice session tomorrow at 3:00 PM",
            timestamp: "Yesterday",
            read: true,
            link: "/dashboard/sessions/2",
          },
          {
            id: "6",
            type: "new_message",
            title: "New Message",
            message: "David replied to your question in Biology Research Team",
            timestamp: "2 days ago",
            read: true,
            link: "/dashboard/groups/3/chat",
          },
          {
            id: "7",
            type: "resource_update",
            title: "Resource Update",
            message: 'Jane updated "Algorithm Flowcharts" in Computer Science 101',
            timestamp: "3 days ago",
            read: true,
            link: "/dashboard/resources/3",
          },
          {
            id: "8",
            type: "group_update",
            title: "Group Update",
            message: "New member joined Calculus Study Group",
            timestamp: "4 days ago",
            read: true,
            link: "/dashboard/groups/1",
          },
        ];
        setNotifications(mockNotifications);
        setIsLoading(false);
      }, 1000);
    };
    fetchNotifications();
  }, []);

  const filteredNotifications = searchQuery
    ? notifications.filter(
        (notification) =>
          notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          notification.message.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : notifications;

  const sessionNotifications = filteredNotifications.filter((n) => n.type === "session_reminder");
  const messageNotifications = filteredNotifications.filter((n) => n.type === "new_message");
  const resourceNotifications = filteredNotifications.filter((n) => n.type === "resource_update");
  const groupNotifications = filteredNotifications.filter(
    (n) => n.type === "group_invite" || n.type === "group_update"
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "session_reminder":
        return (
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
            <Calendar className="h-4 w-4 text-blue-500 dark:text-blue-300" />
          </div>
        );
      case "new_message":
        return (
          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
            <MessageSquare className="h-4 w-4 text-green-500 dark:text-green-300" />
          </div>
        );
      case "resource_update":
        return (
          <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
            <FileText className="h-4 w-4 text-amber-500 dark:text-amber-300" />
          </div>
        );
      case "group_invite":
      case "group_update":
        return (
          <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
            <Users className="h-4 w-4 text-purple-500 dark:text-purple-300" />
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
            <Bell className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search notifications..."
              className="pl-8 w-full md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCircle className="h-4 w-4 mr-2" /> Mark All as Read
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <NotificationList
            notifications={filteredNotifications}
            isLoading={isLoading}
            markAsRead={markAsRead}
            getNotificationIcon={getNotificationIcon}
            searchQuery={searchQuery}
          />
        </TabsContent>

        <TabsContent value="unread">
          <NotificationList
            notifications={filteredNotifications.filter((n) => !n.read)}
            isLoading={isLoading}
            markAsRead={markAsRead}
            getNotificationIcon={getNotificationIcon}
            searchQuery={searchQuery}
            emptyMessage="No unread notifications"
          />
        </TabsContent>

        <TabsContent value="sessions">
          <NotificationList
            notifications={sessionNotifications}
            isLoading={isLoading}
            markAsRead={markAsRead}
            getNotificationIcon={getNotificationIcon}
            searchQuery={searchQuery}
            emptyMessage="No session notifications"
          />
        </TabsContent>

        <TabsContent value="messages">
          <NotificationList
            notifications={messageNotifications}
            isLoading={isLoading}
            markAsRead={markAsRead}
            getNotificationIcon={getNotificationIcon}
            searchQuery={searchQuery}
            emptyMessage="No message notifications"
          />
        </TabsContent>

        <TabsContent value="resources">
          <NotificationList
            notifications={resourceNotifications}
            isLoading={isLoading}
            markAsRead={markAsRead}
            getNotificationIcon={getNotificationIcon}
            searchQuery={searchQuery}
            emptyMessage="No resource notifications"
          />
        </TabsContent>

        <TabsContent value="groups">
          <NotificationList
            notifications={groupNotifications}
            isLoading={isLoading}
            markAsRead={markAsRead}
            getNotificationIcon={getNotificationIcon}
            searchQuery={searchQuery}
            emptyMessage="No group notifications"
          />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

function NotificationList({
  notifications,
  isLoading,
  markAsRead,
  getNotificationIcon,
  searchQuery,
  emptyMessage = "No notifications found",
}) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Loading notifications...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">{emptyMessage}</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "No notifications match your search criteria." : "You're all caught up!"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border flex items-start gap-3 ${!notification.read ? "bg-muted/50" : ""}`}
              onClick={() => markAsRead(notification.id)}
            >
              {getNotificationIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                <div className="mt-2">
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <a href={notification.link}>View Details</a>
                  </Button>
                </div>
              </div>
              {!notification.read && <div className="h-2 w-2 rounded-full bg-primary mt-1"></div>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}