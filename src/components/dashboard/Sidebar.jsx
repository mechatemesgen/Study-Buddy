import { useState, useEffect, createContext, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Users,
  Calendar,
  File,
  Settings,
  LogOut,
  Menu,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Create a context for the sidebar
const SidebarContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
})

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(true)
  
  // Close sidebar on mobile by default
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }
    
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])
  
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  return useContext(SidebarContext)
}

export function Sidebar({ className, isMobile = false, onNavItemClick }) {
  const { isOpen, setIsOpen } = useSidebar()
  const { user, logout } = useAuth()
  const location = useLocation()
  
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const sidebarLinks = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      match: (path) => path === "/dashboard" || path === "/"
    },
    {
      title: "Study Groups",
      icon: Users,
      path: "/dashboard/groups",
    },
    {
      title: "Study Sessions",
      icon: Calendar,
      path: "/dashboard/sessions",
    },
    {
      title: "Resources",
      icon: File,
      path: "/dashboard/resources",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <Link to="/dashboard" className="flex items-center">
              <span className="text-xl font-bold">Study Buddy</span>
            </Link>
            <button
              className="p-1 rounded-md hover:bg-gray-200 md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          
          {/* User profile */}
          <div className="p-4 border-b">
            <Link to="/dashboard/profile" className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>
                  {user?.name?.substring(0, 2).toUpperCase() || "SB"}
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <div className="font-medium truncate">{user?.name || "User"}</div>
                <div className="text-sm text-muted-foreground truncate">
                  {user?.email || "user@example.com"}
                </div>
              </div>
            </Link>
          </div>
          
          {/* Navigation links */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const active = link.match ? link.match(location.pathname) : isActive(link.path);
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-4 py-2 text-sm rounded-md ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {link.title}
                </Link>
              );
            })}
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 mt-4 text-sm text-foreground rounded-md hover:bg-muted"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </nav>
        </div>
      </aside>
    </>
  )
}
