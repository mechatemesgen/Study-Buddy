import { Card, CardContent } from "../components/ui/card";
import { Linkedin, Twitter, Mail } from "lucide-react";

import CEO from "../../src/assets/CEO.jpg";
import Cofounder from "../../src/assets/Co-Founder.jpg";
import HeadofEducation from "../../src/assets/HeadofEducation.jpg";
import HeadofProduct from "../../src/assets/HeadofProduct.jpg";

export default function TeamSection() {
  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Co-Founder & CEO",
      bio: "Former professor with a passion for educational technology and collaborative learning.",
      image: CEO,
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@studybuddy.com",
      },
    },
    {
      name: "Michael Chen",
      role: "Co-Founder & CTO",
      bio: "Software engineer with experience building educational platforms and learning management systems.",
      image: Cofounder,
      social: {
        linkedin: "#",
        twitter: "#",
        email: "michael@studybuddy.com",
      },
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      bio: "Former teacher with a background in UX design and educational psychology.",
      image: HeadofEducation,
      social: {
        linkedin: "#",
        twitter: "#",
        email: "emily@studybuddy.com",
      },
    },
    {
      name: "David Kim",
      role: "Head of Education",
      bio: "Education researcher specializing in collaborative learning and student engagement.",
      image: HeadofProduct,
      social: {
        linkedin: "#",
        twitter: "#",
        email: "david@studybuddy.com",
      },
    },
  ];

  return (
    <section id="team" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Our Team
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Meet the People Behind Study Buddy
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Our diverse team of educators, technologists, and designers is passionate about transforming education
            </p>
          </div>
        </div>

        {/* Responsive grid layout */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden border-none shadow-lg flex flex-col h-full"
            >
              <div className="w-full aspect-[4/3] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="flex flex-col flex-1 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                <div className="mt-auto flex space-x-4">
                  <a
                    href={member.social.linkedin}
                    className="text-muted-foreground hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-muted-foreground hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
