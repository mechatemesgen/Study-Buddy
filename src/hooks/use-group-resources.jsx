import { useQuery } from "@tanstack/react-query"
import { fetchGroupResources } from "@/api/resources"

export function useGroupResources(groupId) {
  const {
    data: resources,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["group-resources", groupId],
    queryFn: () => fetchGroupResources(groupId),
    enabled: !!groupId,
  })

  return {
    resources: resources || [],
    isLoading,
    error,
  }
}
