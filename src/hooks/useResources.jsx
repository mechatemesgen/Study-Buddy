import { useQuery } from "@tanstack/react-query";
import { fetchResources } from "../api/resources"; // Adjust path if needed

export function useResources() {
  const {
    data: resources,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["resources"],
    queryFn: fetchResources,
  });

  return {
    resources: resources || [],
    isLoading,
    error,
  };
}
