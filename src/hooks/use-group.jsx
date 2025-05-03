import { useQuery } from "@tanstack/react-query"
import { fetchGroup } from "@/api/groups"

export function useGroup(id) {
  const {
    data: group,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["group", id],
    queryFn: () => fetchGroup(id),
    enabled: !!id,
  })

  return {
    group,
    isLoading,
    error,
  }
}
