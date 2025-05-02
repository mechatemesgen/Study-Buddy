import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatRelativeTime(date) {
  const now = new Date()
  const diff = now - new Date(date)

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 1) {
    return "Just now"
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
  } else if (days < 7) {
    return `${days} ${days === 1 ? "day" : "days"} ago`
  } else {
    return formatDate(date)
  }
}
