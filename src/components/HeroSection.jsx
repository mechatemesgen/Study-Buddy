import { Link } from "react-router-dom";  // React Router Link instead of Next.js Link
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              #1 Collaborative Learning Platform
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Study Smarter, <span className="text-primary">Together</span>
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Study Buddy connects you with peers, helps you schedule productive study sessions, and makes sharing
              resources seamless.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Form study groups based on your courses and interests</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Schedule and manage study sessions with smart reminders</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Share notes, resources, and study materials effortlessly</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/signup">Get Started — It's Free</Link>  {/* Updated for React Router */}
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="#how-it-works">See How It Works</Link>  {/* Updated for React Router */}
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Join 10,000+ students already improving their grades with Study Buddy
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[600px]">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-border/50 relative">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Students collaborating on a study session"
                className="object-cover w-full h-full"
              />

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-background rounded-lg p-4 shadow-lg border border-border/50 w-48 hidden md:block">
                <div className="text-sm font-medium">Next Study Session</div>
                <div className="text-xs text-muted-foreground mt-1">Calculus Group • Today, 3:00 PM</div>
                <div className="mt-2 h-1 bg-primary rounded-full w-3/4"></div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-background rounded-lg p-4 shadow-lg border border-border/50 w-48 hidden md:block">
                <div className="text-sm font-medium">Study Progress</div>
                <div className="text-xs text-muted-foreground mt-1">12 hours this week</div>
                <div className="mt-2 h-1 bg-secondary rounded-full w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
