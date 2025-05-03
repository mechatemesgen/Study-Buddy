import { useQuery } from "@tanstack/react-query"
import { fetchSessions } from "@/api/sessions"

export function useSessions() {
  const {
    data: sessions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
  })

  return {
    sessions: sessions || [],
    isLoading,
    error,
  }
}
