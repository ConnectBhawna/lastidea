import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Project Search</h1>
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="flex-grow px-4 py-2 border text-black border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors flex items-center"
          >
            <Search className="mr-2" size={20} />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}