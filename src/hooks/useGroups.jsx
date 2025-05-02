import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "../api/groups"; // Adjust the import path as needed

export function useGroups() {
  const {
    data: groups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });

  return {
    groups: groups || [],
    isLoading,
    error,
  };
}
