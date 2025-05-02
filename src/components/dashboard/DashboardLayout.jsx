import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../../hooks/use-auth"; 
import  {Sidebar}  from "../ui/Sidebar"; 
import { MobileNav } from "./MobileNav"; 
import { NotificationDropdown } from "./NotificationDropdown"; 
import { UserMenu } from "./UserMenu"; 
import { Button } from "../ui/button"; 
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/Sheet"; 

export function DashboardLayout({ children }) {
  const navigate = useNavigate(); 
  const { user, logout } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!user) {
      navigate("/login"); // Redirect to login if user is not authenticated
    }
  }, [user, navigate]);

  if (!isMounted || !user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <Sidebar isMobile={true} onNavItemClick={() => setIsMobileMenuOpen(false)} />
              </SheetContent>
            </Sheet>
            <div className="text-xl font-bold hidden md:inline-block">Study Buddy</div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationDropdown />
            <UserMenu user={user} onLogout={logout} />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <Sidebar className="hidden md:flex" />
        <main className="flex-1 container py-6">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
