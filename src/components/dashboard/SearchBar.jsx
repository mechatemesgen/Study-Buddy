import { useState } from "react";
import { Input } from "../../components/ui/input"; // Adjust path as necessary
import { Search } from "lucide-react";

export function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative max-w-xs w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-8 w-full"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
