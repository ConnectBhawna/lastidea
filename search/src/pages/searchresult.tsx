import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { query } from 'arweave-indexer';

interface Project {
  title: string;
  link: string;
  description: string;
  twitter?: string;
}

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Rename the state variable to avoid conflict with arweave-indexer query
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  // Extract query from location state when page loads
  useEffect(() => {
    const initialQuery = location.state?.query;
    if (initialQuery) {
      setSearchQuery(initialQuery);
      performSearch(initialQuery);
    }
  }, [location.state]);

  const performSearch = async (searchTerm: string) => {
    setLoading(true);
    try {
      // Use the actual search query passed to the function
      const projects = await query(searchTerm);
      
      if (projects && Array.isArray(projects)) {
        setResults(projects);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Update URL and perform search
      navigate('/search', { state: { query: searchQuery } });
      performSearch(searchQuery);
    }
  };

  const truncateDescription = (desc: string, maxLength = 160) => {
    return desc.length > maxLength
      ? desc.substring(0, maxLength) + '...'
      : desc;
  };

  // const goToIndexPage = () => {
  //   navigate('/index');
  // };

  return (
    <div className="container p-4 mx-auto">
      <div className="flex mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects..."
          className="flex-grow px-4 py-2 text-black border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch}
          className="px-4 py-2 text-white bg-blue-500 rounded-r-md hover:bg-blue-600"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {loading ? (
        <p>Loading results...</p>
      ) : results.length > 0 ? (
        <div className="grid gap-4">
          {results.map((project, index) => (
            <div key={index} className="p-4 border rounded-md">
              <h3 className="text-lg font-bold">{project.title}</h3>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {project.link}
              </a>
              <p className="mt-2 text-gray-600">
                {truncateDescription(project.description)}
              </p>
              {project.twitter && (
                <p className="mt-2 text-sm">
                  Twitter: {project.twitter}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : searchQuery ? (
        <p>No results found</p>
      ) : null}
    </div>
  );
}