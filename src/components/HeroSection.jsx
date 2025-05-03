import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import StudentsImage from "../../src/assets/StudySmarterHero.jpg";
import { Link } from "react-router-dom";

export function HeroSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="w-full py-3 md:py-1 lg:py-10 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
    
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6" data-aos="fade-up">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              #1 Collaborative Learning Platform
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl" data-aos="fade-up" data-aos-delay="100">
              Study Smarter, <span className="text-primary">Together</span>
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl" data-aos="fade-up" data-aos-delay="200">
              Study Buddy connects you with peers, helps you schedule productive study sessions, and makes sharing
              resources seamless.
            </p>

            <div className="space-y-3" data-aos="fade-up" data-aos-delay="300">
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

            <div className="flex flex-col sm:flex-row gap-3" data-aos="fade-up" data-aos-delay="400">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => {
                  const target = document.querySelector("#how-it-works");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                See How It Works
              </Button>
            </div>

            <p className="text-sm text-muted-foreground" data-aos="fade-up" data-aos-delay="500">
              Join 10,000+ students already improving their grades with Study Buddy
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[600px]" data-aos="fade-left">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-border/50 relative">
              <img
                src={StudentsImage}
                alt="Students collaborating on a study session"
                className="object-cover w-full h-full"
              />

              {/* Floating elements */}
              <div className="absolute -top-0 -right-0 m-2 bg-background rounded-lg p-4 shadow-lg border border-border/50 w-48 hidden md:block" data-aos="zoom-in" data-aos-delay="600">
                <div className="text-sm font-medium">Next Study Session</div>
                <div className="text-xs text-muted-foreground mt-1">Calculus Group • Today, 3:00 PM</div>
                <div className="mt-2 h-1 bg-primary rounded-full w-3/4"></div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-background rounded-lg p-4 shadow-lg border border-border/50 w-48 hidden md:block" data-aos="zoom-in" data-aos-delay="700">
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
