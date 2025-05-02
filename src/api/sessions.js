// Mock API service for study sessions
// In a real app, this would connect to your Django REST backend

import { MOCK_DELAY } from "@/config/api-config"

// Simulated delay for API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock session data
const mockSessions = [
  {
    id: "1",
    title: "Calculus Midterm Review",
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 1) + 2 * 60 * 60 * 1000),
    groupId: "1",
    groupName: "Calculus Study Group",
    description: "Reviewing chapters 1-5 for the midterm exam. We'll focus on integration techniques and applications.",
    agenda: [
      "Review of differentiation rules",
      "Integration techniques",
      "Applications of integration",
      "Practice problems",
    ],
    location: "Library Study Room 3",
    attendees: [
      { id: "1", name: "John Doe", avatar: "", isHost: true },
      { id: "2", name: "Jane Smith", avatar: "", isHost: false },
      { id: "3", name: "Michael Chen", avatar: "", isHost: false },
      { id: "4", name: "Emily Rodriguez", avatar: "", isHost: false },
    ],
    maxAttendees: 8,
    isVirtual: true,
    meetingLink: "https://meet.google.com/abc-defg-hij",
    materials: [
      { id: "1", title: "Calculus Cheat Sheet", type: "pdf" },
      { id: "2", title: "Midterm Practice Problems", type: "docx" },
    ],
    status: "upcoming",
  },
  {
    id: "2",
    title: "Programming Practice",
    start: new Date(new Date().setHours(new Date().getHours() + 1)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
    groupId: "2",
    groupName: "Computer Science 101",
    description: "Solving algorithm problems and coding challenges to prepare for technical interviews.",
    agenda: ["Array manipulation problems", "String algorithms", "Dynamic programming introduction", "Code review"],
    location: "",
    attendees: [
      { id: "1", name: "John Doe", avatar: "", isHost: false },
      { id: "2", name: "Jane Smith", avatar: "", isHost: true },
      { id: "5", name: "David Kim", avatar: "", isHost: false },
      { id: "6", name: "Sarah Williams", avatar: "", isHost: false },
      { id: "7", name: "Alex Johnson", avatar: "", isHost: false },
      { id: "8", name: "Lisa Brown", avatar: "", isHost: false },
    ],
    maxAttendees: 10,
    isVirtual: true,
    meetingLink: "https://zoom.us/j/123456789",
    materials: [
      { id: "3", title: "Algorithm Flowcharts", type: "pptx" },
      { id: "5", title: "JavaScript Basics", type: "js" },
    ],
    status: "upcoming",
  },
  {
    id: "3",
    title: "Integration Techniques",
    start: new Date(new Date().setDate(new Date().getDate() + 3)),
    end: new Date(new Date().setDate(new Date().getDate() + 3) + 1.5 * 60 * 60 * 1000),
    groupId: "1",
    groupName: "Calculus Study Group",
    description: "Focusing on advanced integration techniques including substitution, parts, and partial fractions.",
    agenda: ["U-substitution review", "Integration by parts", "Partial fractions", "Trigonometric substitutions"],
    location: "Math Building Room 203",
    attendees: [
      { id: "1", name: "John Doe", avatar: "", isHost: false },
      { id: "2", name: "Jane Smith", avatar: "", isHost: true },
      { id: "3", name: "Michael Chen", avatar: "", isHost: false },
    ],
    maxAttendees: 6,
    isVirtual: false,
    meetingLink: "",
    materials: [],
    status: "upcoming",
  },
  {
    id: "4",
    title: "Biology Lab Prep",
    start: new Date(new Date().setDate(new Date().getDate() + 5)),
    end: new Date(new Date().setDate(new Date().getDate() + 5) + 2 * 60 * 60 * 1000),
    groupId: "3",
    groupName: "Biology Research Team",
    description: "Preparing for next week's lab experiment on cell cultures.",
    agenda: [
      "Lab safety review",
      "Experimental procedure walkthrough",
      "Data collection methods",
      "Analysis techniques",
    ],
    location: "Science Building Lab 4",
    attendees: [
      { id: "1", name: "John Doe", avatar: "", isHost: true },
      { id: "6", name: "Sarah Williams", avatar: "", isHost: false },
      { id: "7", name: "Alex Johnson", avatar: "", isHost: false },
      { id: "8", name: "Lisa Brown", avatar: "", isHost: false },
    ],
    maxAttendees: 6,
    isVirtual: false,
    meetingLink: "",
    materials: [{ id: "6", title: "Biology Notes Chapter 5", type: "pdf" }],
    status: "upcoming",
  },
  {
    id: "5",
    title: "Past Study Session",
    start: new Date(new Date().setDate(new Date().getDate() - 2)),
    end: new Date(new Date().setDate(new Date().getDate() - 2) + 2 * 60 * 60 * 1000),
    groupId: "1",
    groupName: "Calculus Study Group",
    description: "Review of differentiation rules and applications.",
    agenda: ["Power rule", "Product and quotient rules", "Chain rule", "Applications"],
    location: "Library Study Room 2",
    attendees: [
      { id: "1", name: "John Doe", avatar: "", isHost: true },
      { id: "2", name: "Jane Smith", avatar: "", isHost: false },
      { id: "3", name: "Michael Chen", avatar: "", isHost: false },
    ],
    maxAttendees: 8,
    isVirtual: false,
    meetingLink: "",
    materials: [],
    status: "completed",
    notes:
      "We covered all the differentiation rules and worked through several example problems. Everyone should review the practice problems before the next session.",
  },
]

export async function fetchSessions() {
  // Simulate API call
  await delay(MOCK_DELAY)
  return mockSessions
}

export async function fetchGroupSessions(groupId) {
  // Simulate API call
  await delay(MOCK_DELAY)
  return mockSessions.filter((session) => session.groupId === groupId)
}

export async function fetchSession(id) {
  // Simulate API call
  await delay(MOCK_DELAY)
  return mockSessions.find((session) => session.id === id) || null
}

export async function scheduleSession(data) {
  // Simulate API call
  await delay(MOCK_DELAY)

  const newSession = {
    id: String(mockSessions.length + 1),
    title: data.title,
    start: data.start,
    end: data.end,
    groupId: data.groupId,
    groupName:
      data.groupId === "1"
        ? "Calculus Study Group"
        : data.groupId === "2"
          ? "Computer Science 101"
          : data.groupId === "3"
            ? "Biology Research Team"
            : "Unknown Group",
    description: data.description || "",
    agenda: data.agenda || [],
    location: data.location || "",
    attendees: [
      { id: "1", name: "John Doe", avatar: "", isHost: true }, // Current user as host
    ],
    maxAttendees: data.maxAttendees || null,
    isVirtual: data.isVirtual || false,
    meetingLink: data.meetingLink || "",
    materials: [],
    status: "upcoming",
  }

  mockSessions.push(newSession)
  return newSession
}

export async function joinSession(id) {
  // Simulate API call
  await delay(MOCK_DELAY / 2)

  const session = mockSessions.find((s) => s.id === id)
  if (session) {
    // Check if user is already in attendees
    const isAlreadyJoined = session.attendees.some((a) => a.id === "1") // Current user ID

    if (!isAlreadyJoined) {
      // Check if session is full
      if (session.maxAttendees && session.attendees.length >= session.maxAttendees) {
        return { success: false, error: "Session is full" }
      }

      // Add user to attendees
      session.attendees.push({ id: "1", name: "John Doe", avatar: "", isHost: false })
    }

    return { success: true, session }
  }

  return { success: false, error: "Session not found" }
}

export async function leaveSession(id) {
  // Simulate API call
  await delay(MOCK_DELAY / 2)

  const session = mockSessions.find((s) => s.id === id)
  if (session) {
    // Check if user is in attendees
    const attendeeIndex = session.attendees.findIndex((a) => a.id === "1") // Current user ID

    if (attendeeIndex !== -1) {
      // Check if user is the host
      if (session.attendees[attendeeIndex].isHost) {
        return { success: false, error: "Host cannot leave the session" }
      }

      // Remove user from attendees
      session.attendees.splice(attendeeIndex, 1)
    }

    return { success: true }
  }

  return { success: false, error: "Session not found" }
}

export async function addSessionMaterial(sessionId, resourceId) {
  // Simulate API call
  await delay(MOCK_DELAY / 2)

  const session = mockSessions.find((s) => s.id === sessionId)
  if (session) {
    // In a real app, you would fetch the resource details
    // For now, we'll just add a mock resource
    session.materials.push({
      id: resourceId,
      title: `Resource ${resourceId}`,
      type: "pdf",
    })

    return { success: true, session }
  }

  return { success: false, error: "Session not found" }
}
