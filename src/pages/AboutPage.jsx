import React, { useEffect } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import TeamSection from "../../src/components/TeamSection";
import { MissionSection } from "../../src/components/MissionSection";
import { Button } from "../../src/components/ui/button";
import { Link } from "react-router-dom";

import CountUp from "@/utils/CountUp";
import { useCountUpWhenInView } from "../../src/hooks/useCountUpWhenInView";

import AboutUsImg from "../../src/assets/AboutUs.jpg";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const users = useCountUpWhenInView(10000);
  const countries = useCountUpWhenInView(50);
  const universities = useCountUpWhenInView(500);
  const satisfaction = useCountUpWhenInView(92);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with Animation */}
        <motion.section
          className="w-full py-10 sm:py-14 md:py-20 lg:py-32 bg-muted/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="container px-4 sm:px-6 md:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                  About Study Buddy
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
                  We're on a mission to transform how students learn together. Study Buddy was created by a team of
                  educators and technologists who believe in the power of collaborative learning.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" asChild>
                    <Link to="/signup">Join Our Community</Link>
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => {
                    const teamSection = document.getElementById("team");
                    if (teamSection) {
                      teamSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}>
                    Meet Our Team
                  </Button>
                </div>
              </div>
              <div className="w-full aspect-video max-w-md sm:max-w-lg md:max-w-[500px] mx-auto rounded-xl overflow-hidden shadow-xl">
                <motion.img
                  src={AboutUsImg}
                  alt="Study Buddy team"
                  className="object-cover w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeIn" }}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Our Story Section with Animation */}
        <motion.section
          className="w-full py-10 sm:py-14 md:py-20 lg:py-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="container px-4 sm:px-6 md:px-8">
            <div className="text-center space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Story</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                How Study Buddy Began
              </h2>
            </div>
            <div className="mx-auto mt-8 space-y-6 max-w-prose text-left text-base sm:text-lg leading-relaxed">
              <p>
                Study Buddy was founded in 2020 by a group of graduate students who experienced firsthand the challenges
                of remote learning during the global pandemic...
              </p>
              <p>
                Our founders recognized that many students struggle with motivation, organization, and understanding
                complex concepts when studying alone...
              </p>
              <p>
                Today, Study Buddy serves thousands of students across the globe, from high school to graduate school...
              </p>
            </div>
          </div>
        </motion.section>

        <MissionSection />
        <TeamSection />

        {/* Stats Section with Animation */}
        <motion.section
          className="w-full py-10 sm:py-14 md:py-20 lg:py-32 bg-muted/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="container px-4 sm:px-6 md:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
              <motion.div
                ref={users.ref}
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="text-4xl sm:text-5xl font-bold text-primary">
                  <CountUp value={users.count} suffix="+" />
                </div>
                <p className="text-base font-medium">Active Users</p>
              </motion.div>

              <motion.div
                ref={countries.ref}
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="text-4xl sm:text-5xl font-bold text-primary">
                  <CountUp value={countries.count} suffix="+" />
                </div>
                <p className="text-base font-medium">Countries</p>
              </motion.div>

              <motion.div
                ref={universities.ref}
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <div className="text-4xl sm:text-5xl font-bold text-primary">
                  <CountUp value={universities.count} suffix="+" />
                </div>
                <p className="text-base font-medium">Universities</p>
              </motion.div>

              <motion.div
                ref={satisfaction.ref}
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <div className="text-4xl sm:text-5xl font-bold text-primary">
                  <CountUp value={satisfaction.count} suffix="%" />
                </div>
                <p className="text-base font-medium">Student Satisfaction</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section with Animation */}
        <motion.section
          className="w-full py-10 sm:py-14 md:py-20 lg:py-32 bg-primary text-primary-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <div className="container px-4 sm:px-6 md:px-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Ready to Transform Your Learning Experience?
              </h2>
              <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed">
                Join thousands of students who are already using Study Buddy to improve their grades and make learning
                more enjoyable.
              </p>
              <Button size="lg" variant="secondary" className="mt-4" asChild>
                <Link to="/signup">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
