import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../../hooks/use-auth"; 
import { Sidebar } from "./Sidebar"; 
import { MobileNav } from "./MobileNav"; 
import { NotificationDropdown } from "./NotificationDropdown"; 
import { UserMenu } from "./UserMenu"; 
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/Sheet"; 

import Logo from "../../assets/Logo.svg";

export function DashboardLayout({ children }) {
  const navigate = useNavigate(); 
  const { user, logout } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!isMounted || !user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-2">
            <img
              src={Logo}
              alt="Study Buddy Logo"
              className="h-8 w-auto"
            />
          </div>
          <div className="flex items-center gap-4">
            <NotificationDropdown />
            <UserMenu user={user} onLogout={logout} />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        <main className="flex-1 container py-6 px-4 sm:px-6 md:px-8">
          {children}
        </main>
      </div>

      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  );
}
