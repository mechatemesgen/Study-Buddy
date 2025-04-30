// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom"
import { BookOpen, Moon, Sun } from "lucide-react"
import { useAuth } from "../../hooks/use-auth"
import { useTheme } from "next-themes"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
  } from "../ui/dropdown-menu"
import Button from "../ui/button";


export function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === "/"
  const isAuthPage = ["/login", "/signup"].includes(pathname)
  const { user, logout } = useAuth()
  const { setTheme } = useTheme()

  if (pathname.startsWith("/dashboard")) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold">Study Buddy</span>
        </Link>

        {/* ── Group 1: Anchors only on Home ── */}
        {isHome && (
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link to="/#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How It Works</Link>
            <Link to="/#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</Link>
          </nav>
        )}

        {/* ── Group 2: Other-page links (only when not on Home) ── */}
        {!isHome && (
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About Us</Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {/* Theme Toggle always available */}
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
              {/* Sign In / Up only when not on auth pages */}
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

              {/* Mobile menu: merge both groups for small screens */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="md:hidden">
                  <Button variant="outline" size="icon">
                    <BookOpen className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isHome && <>
                    <DropdownMenuItem asChild><Link to="/#features">Features</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link to="/#how-it-works">How It Works</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link to="/#testimonials">Testimonials</Link></DropdownMenuItem>
                  </>}
                  {!isHome && (
                    <DropdownMenuItem asChild><Link to="/about">About Us</Link></DropdownMenuItem>
                  )}
                  {!isAuthPage && <>
                    <DropdownMenuItem asChild><Link to="/login">Sign In</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link to="/signup">Sign Up</Link></DropdownMenuItem>
                  </>}
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
