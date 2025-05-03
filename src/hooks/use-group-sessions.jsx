import { useQuery } from "@tanstack/react-query"
import { fetchGroupSessions } from "@/api/sessions"

export function useGroupSessions(groupId) {
  const {
    data: sessions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["group-sessions", groupId],
    queryFn: () => fetchGroupSessions(groupId),
    enabled: !!groupId,
  })

  return {
    sessions: sessions || [],
    isLoading,
    error,
  }
}
