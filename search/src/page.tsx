import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Spline from '@splinetool/react-spline';

export default function Home() {


  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchPath, setSearchPath] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  console.log(searchPath)

  const handleSearch = () => {
    if (query.trim()) {
      setIsSearching(true);

      // Simulate search delay
      const timeout = setTimeout(() => {
        // Simulate navigation by setting a search path
        setSearchPath(`/search?query=${encodeURIComponent(query)}`);
        setIsSearching(false);
        navigate('/search', { state: { query } });
      }, 2000); // 5 seconds delay

      // Clear timeout in case it's called multiple times or canceled
      return () => clearTimeout(timeout);
    }
  };




  return (
    <main className='w-full h-screen reletive'>

      <Spline
        scene="https://prod.spline.design/RgYcaxSqePgtGoNa/scene.splinecode" 
        className='scale-[200%]'
      />

        <div className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 pb-16 text-white flex items-center justify-center flex-col top-0 left-0 w-fit h-fit z-30'>
       
          {/* Logo and Subtitle - Conditionally Styled */}
          <div
            className={`
              transition-all  duration-700 ease-in-out
              ${isSearching ? 'scale-50 opacity-50 mb-8' : 'scale-100 opacity-100'}
            `}
          >
            <h1
              className={`
                text-7xl md:text-8xl text-center font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent
                ${isLoaded ? 'animate-heading' : 'opacity-0'}
              `}
            >
              Hagrid
            </h1>
            <p
              className={`
                max-w-2xl te text-xl md:text-2xl text-gray-300 mb-12
                ${isLoaded ? 'animate-fadeIn' : 'opacity-0'}
              `}
            >
              Search, Explore and Index the Data of the Arweave Ecosystem
            </p>
          </div>

          {/* Search Box and Skeleton Loading */}
          <div className="z-40 w-full max-w-md reletive">
            {!isSearching ? (
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the transaction ..."
                  className="flex-grow px-4 py-2 text-lg text-black border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="flex items-center px-6 py-2 text-xl text-white transition-transform transform hover:scale-105 bg-[#9b4dca] rounded-r-md hover:bg-[#7a34a5] hover:scale-110 hover:animate-bounce hover:shadow-lg hover:rotate-6 hover:bg-purple-800"
                  style={{ minHeight: '150%' }}
                >
                  <Search className="mr-2" size={24} />
                  Search
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center text-purple-400">
                <Loader2 className="mr-2 animate-spin" size={24} />
                Searching for "{query}"...
              </div>
            )}
        </div>
        </div>

    </main>
  );
}
