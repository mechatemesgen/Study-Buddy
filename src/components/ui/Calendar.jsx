import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

// Optional: If using TypeScript, define props with DayPickerProps
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 md:space-x-6 md:space-y-0 lg:space-x-8 lg:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium md:text-base lg:text-lg",
        nav: "space-x-1 flex items-center justify-between md:justify-center",
        nav_button: cn(
          buttonVariants["outline"],
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 md:h-8 md:w-8 lg:h-9 lg:w-9"
        ),
        nav_button_previous: "absolute left-1 md:left-2 lg:left-3",
        nav_button_next: "absolute right-1 md:right-2 lg:right-3",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-between",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] md:text-sm lg:text-base",
        row: "flex w-full mt-2 justify-between gap-2", // Added gap between rows
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 md:h-10 md:w-10 lg:h-12 lg:w-12",
        day: cn(
          buttonVariants["ghost"],
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 md:h-10 md:w-10 lg:h-12 lg:w-12"
        ),
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
