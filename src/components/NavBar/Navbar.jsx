import { HashLink } from 'react-router-hash-link'; // Import HashLink
import { BookOpen, Moon, Sun, Menu, X } from "lucide-react";
import { useAuth } from "../../hooks/use-auth";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Drawer } from "../ui/drawer";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Navbar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { setTheme } = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isDashboard = pathname.startsWith("/dashboard");

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  if (isDashboard) {
    return null; // Dashboard has its own header
  }

  const authButtonText = pathname === "/signup" ? "Sign In" : "Sign Up";
  const authButtonLink = pathname === "/signup" ? "/login" : "/signup";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <HashLink
          smooth 
          to="/#"
          className="flex items-center gap-2"
        >
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold">Study Buddy</span>
        </HashLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <HashLink
            smooth
            to="/#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </HashLink>

          <HashLink
            smooth
            to="/#features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </HashLink>
          <HashLink
            smooth
            to="/#how-it-works"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            How It Works
          </HashLink>
          <HashLink
            smooth
            to="/#testimonials"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Testimonials
          </HashLink>
          <HashLink
            smooth
            to="/about#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About Us
          </HashLink>
        </nav>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
                <Moon className="h-[1.2rem] w-[1.2rem] transition-all hidden dark:block" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-3">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!user ? (
            <>
              {/* Desktop Auth Button */}
              <div className="hidden md:block">
                <Button asChild>
                  <HashLink smooth to={authButtonLink}>{authButtonText}</HashLink>
                </Button>
              </div>

              {/* Mobile Hamburger Menu */}
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setIsDrawerOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <HashLink smooth to="/dashboard">Dashboard</HashLink>
              </Button>
              <Button variant="outline" onClick={logout}>
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Side Navigation Drawer for Mobile */}
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        side="left"
        title="Navigation Menu"
        description="Main navigation links for the site"
      >
        <div className="flex flex-col p-4">
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex flex-col gap-4">
            <HashLink
              smooth
              to="/#"
              className="text-lg font-medium"
              onClick={() => setIsDrawerOpen(false)}
            >
              Home
            </HashLink>
            <HashLink
              smooth
              to="/#features"
              className="text-lg font-medium"
              onClick={() => setIsDrawerOpen(false)}
            >
              Features
            </HashLink>
            <HashLink
              smooth
              to="/#how-it-works"
              className="text-lg font-medium"
              onClick={() => setIsDrawerOpen(false)}
            >
              How It Works
            </HashLink>
            <HashLink
              smooth
              to="/#testimonials"
              className="text-lg font-medium"
              onClick={() => setIsDrawerOpen(false)}
            >
              Testimonials
            </HashLink>
            <HashLink
              smooth
              to="/about#"
              className="text-lg font-medium"
              onClick={() => setIsDrawerOpen(false)}
            >
              About Us
            </HashLink>
          </div>
          {!user && (
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <HashLink smooth to={authButtonLink} onClick={() => setIsDrawerOpen(false)}>
                  {authButtonText}
                </HashLink>
              </Button>
            </div>
          )}
        </div>
      </Drawer>
    </header>
  );
}