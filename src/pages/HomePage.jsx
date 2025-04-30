import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeroSection } from "../components/hero-section";
import { FeatureSection } from "../components/feature-section";
import { Navbar } from "../components/NavBar/NavBar";
import { Footer } from "../components/Footer/Footer";
import { HowItWorksSection } from "../components/how-it-works-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { StatsSection } from "@/components/stats-section";
import { FaqSection } from "@/components/faq-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeatureSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FaqSection />
        <section className="py-16 bg-gradient-to-b from-background to-muted">
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
      <Footer />
    </div>
  );
}
