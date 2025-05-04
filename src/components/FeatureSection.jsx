import { Calendar, Users, Clock, FileText } from "lucide-react"
import { useNavigate } from 'react-router-dom';

export function FeatureSection() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Collaborative Study Groups",
      description:
        "Create and join study groups based on subjects, courses, or interests to connect with like-minded peers.",
    },
    {
      icon: Calendar,
      title: "Interactive Study Planner",
      description:
        "Plan and organize your study sessions with an interactive calendar that syncs with your group members.",
      onClick: () => navigate("/calendar"), // ✅ Add navigation function
    },
    {
      icon: Clock,
      title: "Session Scheduling & Reminders",
      description: "Schedule study sessions and receive timely reminders to never miss an important study meeting.",
    },
    {
      icon: FileText,
      title: "Resource Sharing",
      description:
        "Share notes, documents, and study materials with your group members to enhance collaborative learning.",
    },
  ]

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need to Study Effectively
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl">
              Study Buddy provides all the tools you need to make your study sessions more productive, organized, and
              collaborative.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md cursor-pointer"
                onClick={feature.onClick ? feature.onClick : undefined} // ✅ Make it clickable
              >
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-center text-gray-500">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
