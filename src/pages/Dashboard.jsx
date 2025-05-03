import { useState, useEffect } from "react";
import { useAuth } from "../hooks/use-auth"; 
import { DashboardLayout } from "../components/dashboard/DashboardLayout"; 
import { SearchBar } from "../components/dashboard/SearchBar"; 
import { GroupsSection } from "../components/dashboard/GroupsSection"; 
import { SessionsSection } from "../components/dashboard/SessionsSection";
import { ResourcesSection } from "../components/dashboard/ResourcesSection"; 
import { useGroups } from "../hooks/useGroups"; 
import { useSessions } from "../hooks/useSessions"; 
import { useResources } from "../hooks/useResources"; 

export default function DashboardPage() {
  const { user } = useAuth();
  const { groups } = useGroups();
  const { sessions } = useSessions();
  const { resources } = useResources();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return null; // Will redirect in useAuth hook
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter data based on search query
  const filteredGroups = searchQuery
    ? groups?.filter(
        (group) =>
          group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : groups;

  const filteredSessions = searchQuery
    ? sessions?.filter(
        (session) =>
          session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          session.groupName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sessions;

  const filteredResources = searchQuery
    ? resources?.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          resource.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : resources;

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          Welcome back, {user?.name?.split(" ")[0] || "User"}!
        </h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GroupsSection groups={filteredGroups} isLoading={isLoading} />
        <SessionsSection sessions={filteredSessions} isLoading={isLoading} />
      </div>

      <ResourcesSection resources={filteredResources} isLoading={isLoading} />
    </DashboardLayout>
  );
}
