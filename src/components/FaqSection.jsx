// src/components/FaqSection.jsx

import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { motion } from 'framer-motion'

const faqs = [
  {
    question: 'How do I create a study group?',
    answer:
      "After signing up, navigate to your dashboard and click on the 'Create Study Group' button. Fill in the details about your group, such as name, subject, and description. Once created, you can invite others to join your group.",
  },
  {
    question: 'Can I join multiple study groups?',
    answer:
      'Yes! You can join as many study groups as you’d like. The Free plan allows you to join up to 3 groups, while the Pro and Team plans offer unlimited group memberships.',
  },
  {
    question: 'How do I schedule a study session?',
    answer:
      "Within your study group, click on the 'Schedule Session' button. You can set the date, time, and duration of your session, as well as add a description and agenda. All group members will receive notifications about the scheduled session.",
  },
  {
    question: 'What types of files can I share with my group?',
    answer:
      'You can share various file types including PDFs, Word documents, PowerPoint presentations, Excel spreadsheets, images, and more. The Free plan has a 100MB storage limit, while Pro offers 5GB and Team provides unlimited storage.',
  },
  {
    question: 'Is there a mobile app available?',
    answer:
      'Yes, we have mobile apps for both iOS and Android devices. You can download them from the App Store or Google Play Store to access Study Buddy on the go.',
  },
  {
    question: 'How secure is my data on Study Buddy?',
    answer:
      'We take data security very seriously. All data is encrypted both in transit and at rest. We follow industry best practices for security and regularly undergo security audits to ensure your information remains protected.',
  },
]

export default function FaqSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        {/* Header with animation */}
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Find answers to common questions about Study Buddy
            </p>
          </div>
        </motion.div>

        {/* Accordion with staggered animations */}
        <div className="mx-auto max-w-3xl mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <AccordionItem value={`item-${idx}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
