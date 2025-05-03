// Mock API service for authentication
// In a real app, this would connect to your Django REST backend

// Simulated delay for API calls
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Mecha Temesgen",
    email: "ililnaafbarihe94@proton.me",
    password: "123456",
    avatar: "",
  },
  {
    id: "2",
    name: "Eba Smith",
    email: "ebae@example.com",
    password: "password123",
    avatar: "",
  },
]

export async function login(credentials) {
  // Simulate API call
  await delay(1000)

  const user = mockUsers.find(
    (u) =>
      u.email === credentials.email && u.password === credentials.password
  )

  if (!user) {
    throw new Error("Invalid credentials")
  }

  // Return user without password
  const { password, ...userWithoutPassword } = user

  return {
    user: userWithoutPassword,
    token: "mock-jwt-token",
  }
}

export async function signup(userData) {
  // Simulate API call
  await delay(1000)

  // Check if user already exists
  if (mockUsers.some((u) => u.email === userData.email)) {
    throw new Error("User already exists")
  }

  // Create new user
  const newUser = {
    id: String(mockUsers.length + 1),
    name: userData.name,
    email: userData.email,
    password: userData.password,
    avatar: "",
  }

  // In a real app, this would be saved to the database
  mockUsers.push(newUser)

  // Return user without password
  const { password, ...userWithoutPassword } = newUser

  return {
    user: userWithoutPassword,
    token: "mock-jwt-token",
  }
}

export async function refreshToken() {
  // Simulate API call
  await delay(500)

  // In a real app, this would validate the refresh token and return a new access token
  throw new Error("No valid refresh token")
}
