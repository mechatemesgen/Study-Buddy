import React from "react"
import { Target, BookOpen, Users, Award } from "lucide-react"

import { Card } from "../components/ui/card"
import { CardContent } from "../components/ui/card"
import { CardHeader } from "../components/ui/card"
import { CardTitle } from "../components/ui/card"

export function MissionSection() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower students worldwide by creating accessible tools that foster collaborative learning, knowledge sharing, and academic success.",
    },
    {
      icon: BookOpen,
      title: "Our Vision",
      description:
        "A world where every student has access to quality collaborative learning experiences that enhance their education and prepare them for future success.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "We believe in the power of community and connection. Study Buddy is built on the principle that learning is more effective when done together.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We're committed to excellence in everything we do, from the technology we build to the support we provide to our users.",
    },
  ]

  return (
    <section id="mission" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Values</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Drives Us</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              At Study Buddy, we're guided by a set of core values that inform everything we do
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card
                key={index}
                className="border-2 border-border/40 transition-all duration-200 hover:border-primary hover:shadow-md"
              >
                <CardHeader className="pb-2">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
