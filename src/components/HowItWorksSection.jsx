import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ArrowRight, Users, Calendar, FileText, Video } from 'lucide-react';
import { Card } from './ui/card';

import JoinStudyGroups from '../../src/assets/JoinStudyGroups.jpg';
import ScheduleStudySessions from '../../src/assets/ScheduleStudySessions.jpg';
import ShareStudyResources from '../../src/assets/ShareStudyResources.jpg';
import CollaborateinRealTime from '../../src/assets/CollaborateinRealTime.jpg';

const steps = [
  {
    icon: Users,
    title: 'Create or Join Study Groups',
    description:
      'Form study groups based on your courses, subjects, or specific topics you want to master.',
    color: 'bg-blue-500',
    image: JoinStudyGroups,
  },
  {
    icon: Calendar,
    title: 'Schedule Study Sessions',
    description:
      "Use our interactive calendar to plan study sessions that work with everyone's schedule.",
    color: 'bg-purple-500',
    image: ScheduleStudySessions,
  },
  {
    icon: FileText,
    title: 'Share Study Resources',
    description:
      'Upload and share notes, practice problems, flashcards, and other study materials.',
    color: 'bg-green-500',
    image: ShareStudyResources,
  },
  {
    icon: Video,
    title: 'Collaborate in Real-time',
    description:
      'Meet virtually for study sessions with video conferencing and collaborative tools.',
    color: 'bg-amber-500',
    image: CollaborateinRealTime,
  },
];

export default function HowItWorksSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section id="how-it-works" className="w-full py-20 md:py-28 lg:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4" data-aos="fade-up">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary uppercase tracking-wide">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Simple Steps to Study Success
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base md:text-lg">
            Our platform makes collaborative learning easy with just a few simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const iconColor = step.color.replace('bg-', 'text-');
            return (
              <div
                key={idx}
                className="relative group flex flex-col"
                data-aos="zoom-in"
                data-aos-delay={idx * 100}
              >
                {idx < steps.length - 1 && (
                  <div
                    className="hidden xl:block absolute top-1/2 left-full h-px bg-border"
                    style={{ width: 'calc(100% - 4rem)' }}
                  >
                    <ArrowRight className="absolute -right-2 -top-2 text-primary animate-pulse" />
                  </div>
                )}

                <Card className="flex flex-col h-full transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl overflow-hidden">
                  <div className={`${step.color} h-2 w-1/2 rounded-br-lg`} />
                  <div className="relative overflow-hidden h-40 md:h-48">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className={`text-2xl ${iconColor}`}>
                      <Icon />
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
