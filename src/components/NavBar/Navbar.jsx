import { Link, useLocation } from "react-router-dom"
import { BookOpen, Moon, Sun, Menu } from "lucide-react"
import { useAuth } from "../../hooks/use-auth"
import { useTheme } from "next-themes"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "../ui/dropdown-menu"
import { Drawer } from "../ui/drawer"
import { Button } from "@/components/ui/button"; // Named import
import { useState, useEffect } from "react"

export function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === "/"
  const isAuthPage = ["/login", "/signup"].includes(pathname)
  const { user, logout } = useAuth()
  const { setTheme } = useTheme()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    setIsDrawerOpen(false)
  }, [pathname])

  if (pathname.startsWith("/dashboard")) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold">Study Buddy</span>
        </Link>

        {/* Desktop Navigation */}
        {isHome && (
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link to="/#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</Link>
            <Link to="/#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</Link>
          </nav>
        )}
        {!isHome && (
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About Us</Link>
          </nav>
        )}

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
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!user ? (
            <>
              {/* Desktop Sign In / Up */}
              {!isAuthPage && (
                <div className="hidden md:flex gap-2">
                  <Button asChild variant="outline">
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Hamburger Menu */}
              <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsDrawerOpen(true)}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" onClick={logout}>
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Side Navigation Drawer for Mobile */}
      {!user && (
        <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} side="left">
          <div className="flex flex-col gap-4 p-4">
            {isHome && <>
              <Link to="/#features" className="text-lg font-medium" onClick={() => setIsDrawerOpen(false)}>Features</Link>
              <Link to="/#how-it-works" className="text-lg font-medium" onClick={() => setIsDrawerOpen(false)}>How It Works</Link>
              <Link to="/#testimonials" className="text-lg font-medium" onClick={() => setIsDrawerOpen(false)}>Testimonials</Link>
            </>}
            {!isHome && (
              <Link to="/about" className="text-lg font-medium" onClick={() => setIsDrawerOpen(false)}>About Us</Link>
            )}
            {!isAuthPage && <>
              <Link to="/login" className="text-lg font-medium" onClick={() => setIsDrawerOpen(false)}>Sign In</Link>
              <Link to="/signup" className="text-lg font-medium" onClick={() => setIsDrawerOpen(false)}>Sign Up</Link>
            </>}
          </div>
        </Drawer>
      )}
    </header>
  )
}