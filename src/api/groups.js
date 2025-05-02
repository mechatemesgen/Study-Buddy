// Mock API service for groups
// In a real app, this would connect to your Django REST backend

// Simulated delay for API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock group data
const mockGroups = [
  {
    id: "1",
    name: "Calculus Study Group",
    description: "A group for studying calculus and preparing for exams",
    subject: "Mathematics",
    avatar: "",
    memberCount: 5,
    isNew: false,
    lastActivity: "2 hours ago",
    members: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        joinedAt: new Date("2023-01-15"),
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "member",
        joinedAt: new Date("2023-01-20"),
      },
    ],
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Computer Science 101",
    description: "Group for CS fundamentals and programming practice",
    subject: "Computer Science",
    avatar: "",
    memberCount: 8,
    isNew: true,
    lastActivity: "Just now",
    members: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "member",
        joinedAt: new Date("2023-02-10"),
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "admin",
        joinedAt: new Date("2023-02-05"),
      },
    ],
    createdAt: new Date("2023-02-05"),
  },
  {
    id: "3",
    name: "Biology Research Team",
    description: "Collaborative group for biology research projects",
    subject: "Biology",
    avatar: "",
    memberCount: 4,
    isNew: false,
    lastActivity: "Yesterday",
    members: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "member",
        joinedAt: new Date("2023-03-15"),
      },
    ],
    createdAt: new Date("2023-03-10"),
  },
]

export async function fetchGroups() {
  // Simulate API call
  await delay(800)
  return mockGroups
}

export async function fetchGroup(id) {
  // Simulate API call
  await delay(500)
  const group = mockGroups.find((g) => g.id === id)
  return group || null
}

export async function createGroup(data) {
  // Simulate API call
  await delay(1000)

  const newGroup = {
    id: String(mockGroups.length + 1),
    name: data.name,
    description: data.description,
    subject: data.subject,
    avatar: "",
    memberCount: 1,
    isNew: true,
    lastActivity: "Just now",
    members: [
      {
        id: "1", // Current user
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        joinedAt: new Date(),
      },
    ],
    createdAt: new Date(),
  }

  mockGroups.push(newGroup)
  return newGroup
}
