import React from "react";
import { Users, Calendar, Clock, Award } from "lucide-react";
import { useCountUpWhenInView } from "@/hooks/useCountUpWhenInView";

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Active Users",
  },
  {
    icon: Calendar,
    value: 25000,
    suffix: "+",
    label: "Study Sessions",
  },
  {
    icon: Clock,
    value: 120000,
    suffix: "+",
    label: "Study Hours",
  },
  {
    icon: Award,
    value: 92,
    suffix: "%",
    label: "Grade Improvement",
  },
];

export default function StatsSection() {
  return (
    <section className="w-full py-12 md:py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const { count, ref } = useCountUpWhenInView(stat.value, 2000);

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center text-center space-y-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 ref={ref} className="text-3xl font-bold">
                  {count.toLocaleString()}
                  {stat.suffix}
                </h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
