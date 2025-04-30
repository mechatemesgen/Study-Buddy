import { Link, useLocation } from "react-router-dom"
import { BookOpen, Moon, Sun } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useTheme } from "@/hooks/use-theme"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const location = useLocation()
  const pathname = location.pathname
  const { user, logout } = useAuth()
  const { setTheme } = useTheme()
  const isAuthPage = pathname === "/login" || pathname === "/signup"
  const isDashboard = pathname.startsWith("/dashboard")

  if (isDashboard) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold">Study Buddy</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link to="/#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</Link>
          <Link to="/#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About Us</Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth Buttons */}
          {!user ? (
            <>
              <div className="hidden md:block">
                {!isAuthPage && (
                  <>
                    <Button asChild variant="outline" className="mr-2">
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="md:hidden">
                  <Button variant="outline" size="icon">
                    <BookOpen className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/#features">Features</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/#how-it-works">How It Works</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/#testimonials">Testimonials</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/about">About Us</Link>
                  </DropdownMenuItem>
                  {!isAuthPage && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/login">Sign In</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/signup">Sign Up</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
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
    </header>
  )
}
