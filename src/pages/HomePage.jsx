import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeroSection } from "../components/HeroSection";
import { FeatureSection } from "../components/FeatureSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsSection from "../components/StatsSection";
import  FaqSection  from "@/components/FaqSection";

export default function HomePage() {
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
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to start learning together?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join Study Buddy today and transform your study sessions into productive, collaborative experiences.
                </p>
              </div>
              <div className="space-x-4">
                <Link to="/signup">
                  <Button size="lg" className="animate-pulse">
                    Get Started for Free
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
