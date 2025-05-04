import React, { useState, useRef, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { motion } from "framer-motion"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "College Student",
      content:
        "Study Buddy transformed my grades! The personalized plans are a game-changer.",
      rating: 5,
      image: "/placeholder-user.jpg",
    },
    {
      name: "Michael Chen",
      role: "High School Senior",
      content:
        "The AI tutor is like having a patient teacher available 24/7. Highly recommend!",
      rating: 4,
      image: "/placeholder-user.jpg",
    },
    {
      name: "Emily Rodriguez",
      role: "Graduate Student",
      content:
        "The progress tracking keeps me motivated. Best study tool I've used!",
      rating: 5,
      image: "/placeholder-user.jpg",
    },
    {
      name: "David Kim",
      role: "Business Major",
      content:
        "As someone who learns best through discussion, Study Buddy has been perfect.",
      rating: 4,
      image: "/placeholder-user.jpg",
    },
    {
      name: "Alex Johnson",
      role: "Computer Science Student",
      content:
        "Our weekly group sessions improved my grades significantly!",
      rating: 5,
      image: "/placeholder-user.jpg",
    },
  ]

  const containerRef = useRef(null)
  const [scrollPos, setScrollPos] = useState(0)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container
      setScrollPos(scrollLeft)
      setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 1)
    }

    container.addEventListener("scroll", onScroll)
    onScroll()

    return () => container.removeEventListener("scroll", onScroll)
  }, [])

  const scrollByPage = (direction) => {
    const container = containerRef.current
    if (!container) return

    const { scrollLeft, clientWidth, scrollWidth } = container
    const delta = direction === "left" ? -clientWidth : clientWidth
    const newPos = Math.min(
      Math.max(scrollLeft + delta, 0),
      scrollWidth - clientWidth
    )
    container.scrollTo({ left: newPos, behavior: "smooth" })
  }

  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our Users Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Discover how Study Buddy has helped students improve their academic performance
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative mt-12">
          {/* Prev Button */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollByPage("left")}
              disabled={scrollPos <= 0}
              className="rounded-full shadow-lg border-2 hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous testimonials</span>
            </Button>
          </div>

          {/* Scrollable Container */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 py-4 px-2 md:px-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="snap-center flex-shrink-0 w-[90%] sm:w-2/3 md:w-1/2 lg:w-1/3 px-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full border-border/40 transition-shadow duration-200 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar>
                        <AvatarImage src={t.image} alt={t.name} />
                        <AvatarFallback>
                          {t.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{t.name}</h3>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-4 w-4 ${
                            idx < t.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{t.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Next Button */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollByPage("right")}
              disabled={!canScrollNext}
              className="rounded-full shadow-lg border-2 hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next testimonials</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
