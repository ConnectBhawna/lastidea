import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from "./../components/ui/button";

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      // Navigate to search page with query as a state
      navigate('/search', { state: { query } });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-3xl font-bold text-center">Project Search</h1>
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="flex-grow px-4 py-2 text-black border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button
            onClick={handleSearch}
            className="flex items-center px-4 py-2 text-white transition-colors bg-blue-500 rounded-r-md hover:bg-blue-600"
          >
            <Search className="mr-2" size={20} />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}