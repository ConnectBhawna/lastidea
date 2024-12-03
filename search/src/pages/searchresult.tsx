import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { performQueryDryrun } from '../actions';

interface Project {
  title: string;
  link: string;
  description: string;
  twitter?: string;
}

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Extract query from location state when page loads
  useEffect(() => {
    const searchQuery = location.state?.query;
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery);
    }
  }, [location.state]);

  const performSearch = async (searchTerm: string) => {
    setLoading(true);
    try {
      const queryResult = await performQueryDryrun(searchTerm);
      if (queryResult && Array.isArray(queryResult)) {
        setResults(queryResult);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      // Update URL and perform search
      navigate('/search', { state: { query } });
    }
  };

  const truncateDescription = (desc: string, maxLength = 160) => {
    return desc.length > maxLength
      ? desc.substring(0, maxLength) + '...'
      : desc;
  };

  const goToIndexPage = () => {
    navigate('/index');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <button 
          onClick={goToIndexPage}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          title="Go to Index Page"
        >
          indexme
        </button>
        <div className="flex-grow flex">
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

      {loading ? (
        <div className="text-center text-gray-600">Loading results...</div>
      ) : results.length > 0 ? (
        <div className="space-y-6">
          {results.map((project, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl text-blue-700 hover:underline">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  {project.title}
                </a>
              </h2>
              <p className="text-green-700 text-sm mb-2">{project.link}</p>
              <p className="text-gray-600">
                {truncateDescription(project.description)}
              </p>
              {project.twitter && (
                <p className="text-gray-500 text-sm mt-1">
                  Twitter: {project.twitter}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : query ? (
        <div className="text-center text-gray-600">No results found</div>
      ) : null}
    </div>
  );
}