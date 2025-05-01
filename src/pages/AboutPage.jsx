import { Navbar } from "../../components/Navbar/Navbar";
import { Footer } from "../../components/Footer/Footer";
import { TeamSection } from "../../components/team-section";
import { MissionSection } from "../../components/mission-section";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Study Buddy</h1>
                <p className="text-muted-foreground md:text-xl">
                  We're on a mission to transform how students learn together. Study Buddy was created by a team of
                  educators and technologists who believe in the power of collaborative learning.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" asChild>
                    <Link to="/signup">Join Our Community</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="#team">Meet Our Team</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] aspect-video relative rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/placeholder.svg?height=500&width=800"
                  alt="Study Buddy team"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Story</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How Study Buddy Began</h2>
              </div>
            </div>
            <div className="mx-auto max-w-3xl mt-8 space-y-6">
              <p className="text-lg">
                Study Buddy was founded in 2020 by a group of graduate students who experienced firsthand the challenges
                of remote learning during the global pandemic. What started as a simple tool to connect students for
                virtual study sessions quickly evolved into a comprehensive platform for collaborative learning.
              </p>
              <p className="text-lg">
                Our founders recognized that many students struggle with motivation, organization, and understanding
                complex concepts when studying alone. They envisioned a platform that would make it easy for students to
                connect, collaborate, and support each other in their academic journeys.
              </p>
              <p className="text-lg">
                Today, Study Buddy serves thousands of students across the globe, from high school to graduate school,
                helping them form meaningful connections and achieve academic success through the power of collaborative
                learning.
              </p>
            </div>
          </div>
        </section>

        <MissionSection />
        <TeamSection />

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="text-4xl font-bold text-primary">10,000+</div>
                <p className="text-lg font-medium">Active Users</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="text-4xl font-bold text-primary">50+</div>
                <p className="text-lg font-medium">Countries</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="text-4xl font-bold text-primary">500+</div>
                <p className="text-lg font-medium">Universities</p>
              </div>
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="text-4xl font-bold text-primary">92%</div>
                <p className="text-lg font-medium">Student Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Learning Experience?
              </h2>
              <p className="max-w-[700px] md:text-xl">
                Join thousands of students who are already using Study Buddy to improve their grades and make learning
                more enjoyable.
              </p>
              <Button size="lg" variant="secondary" className="mt-4" asChild>
                <Link to="/signup">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
