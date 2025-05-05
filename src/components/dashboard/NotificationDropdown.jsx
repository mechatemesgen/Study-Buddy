import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Using React Router Link for navigation
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/Badge";
import clsx from "clsx"; // Use clsx for className concatenation

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching notifications
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
        ];

        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter((n) => !n.read).length);
        setIsLoading(false);
      }, 1000);
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));
    setUnreadCount(0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "session_reminder":
        return (
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
            <Bell className="h-4 w-4 text-blue-500 dark:text-blue-300" />
          </div>
        );
      case "new_message":
        return (
          <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
            <Bell className="h-4 w-4 text-green-500 dark:text-green-300" />
          </div>
        );
      case "resource_update":
        return (
          <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
            <Bell className="h-4 w-4 text-amber-500 dark:text-amber-300" />
          </div>
        );
      case "group_invite":
        return (
          <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
            <Bell className="h-4 w-4 text-purple-500 dark:text-purple-300" />
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs h-auto py-1" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        {isLoading ? (
          <div className="p-4 text-center text-muted-foreground">Loading notifications...</div>
        ) : notifications.length > 0 ? (
          <ScrollArea className="h-[300px]">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={clsx("p-4 focus:bg-muted cursor-default", !notification.read && "bg-muted/50")}
                onSelect={(e) => e.preventDefault()}
              >
                <Link
                  to={notification.link}
                  className="flex items-start gap-3 w-full"
                  onClick={() => markAsRead(notification.id)}
                >
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-muted-foreground text-xs line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                  </div>
                  {!notification.read && <div className="h-2 w-2 rounded-full bg-primary mt-1"></div>}
                </Link>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        ) : (
          <div className="p-4 text-center text-muted-foreground">No notifications yet</div>
        )}
        <div className="p-2 border-t">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link to="/dashboard/notifications">View All Notifications</Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
