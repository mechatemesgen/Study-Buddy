import { useLocation, Link } from "react-router-dom";
import { BookOpen, Home, Users, Calendar, FileText, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils"; 

export function Sidebar({ className, isMobile = false, onNavItemClick }) {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/groups", label: "Study Groups", icon: Users },
    { href: "/dashboard/sessions", label: "Sessions", icon: Calendar },
    { href: "/dashboard/resources", label: "Resources", icon: FileText },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className={cn("w-64 flex-col border-r bg-background p-4", isMobile ? "flex h-full" : "flex", className)}>
      {isMobile && (
        <div className="flex items-center gap-2 mb-8 px-2">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold">Study Buddy</span>
        </div>
      )}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onNavItemClick}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
