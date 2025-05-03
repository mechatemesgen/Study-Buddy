import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Calendar, FileText, User, Settings } from "lucide-react";
import clsx from "clsx"; // Utility for combining class names

export function MobileNav() {
  const location = useLocation(); // React Router's equivalent of `usePathname`

  const navItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/dashboard/groups", label: "Groups", icon: Users },
    { href: "/dashboard/sessions", label: "Sessions", icon: Calendar },
    { href: "/dashboard/resources", label: "Resources", icon: FileText },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  // 
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              to={item.href}
              className={clsx(
                "flex flex-col items-center justify-center w-full h-full text-xs",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
