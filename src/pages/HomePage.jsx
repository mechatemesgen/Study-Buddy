import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeroSection } from "../components/HeroSection";
import { FeatureSection } from "../components/FeatureSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsSection from "../components/StatsSection";
import  FaqSection  from "@/components/FaqSection";
import { useSnack } from './snack';
import { ContinuousCalendar } from '../components/calendar';
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export default function HomePage() {
  const { createSnack } = useSnack();

  const onClickHandler = (day, month, year) => {
    const snackMessage = `Clicked on ${monthNames[month]} ${day}, ${year}`;
    createSnack(snackMessage, 'success');}
  return (
    
    <div className="min-h-screen bg-background">
      <main>
        <div id="hero">
          <HeroSection />
        </div>
        <div id="stats">
          <StatsSection />
        </div>
        <div id="features">
          <FeatureSection />
        </div>
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <div id="faq">
          <FaqSection />
        </div>
        <section id="get-started" className="py-16 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  Ready to start learning together?
                </h2>
                <p className="mx-auto max-w-[90%] text-muted-foreground sm:max-w-[700px] sm:text-base md:text-xl">
                  Join Study Buddy today and transform your study sessions into productive, collaborative experiences.
                </p>
              </div>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto animate-pulse">
                    Get Started for Free
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="relative flex h-screen max-h-screen w-full flex-col gap-4 px-4 pt-4 items-center justify-center">
      <div className="relative h-full overflow-auto mt-20">
        <ContinuousCalendar onClick={onClickHandler} />
      </div>
    </div>
    </div>
  );
}
