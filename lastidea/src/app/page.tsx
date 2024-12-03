"use client";
import { useState } from "react";
import { performQueryDryrun } from "./actions";
import Link from "next/link";
import { Search } from "lucide-react";

interface Project {
  title: string;
  link: string;
  description: string;
  twitter?: string;
}

export default function ProjectSearch() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Project[]>([]);

  const handleSearch = async () => {
    try {
      const queryResult = await performQueryDryrun(query);
      if (queryResult && Array.isArray(queryResult)) {
        setResults(queryResult);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const truncateDescription = (desc: string, maxLength = 160) => {
    return desc.length > maxLength 
      ? desc.substring(0, maxLength) + '...' 
      : desc;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex mb-6">
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

      {results.length > 0 && (
        <div className="space-y-6">
          {results.map((project, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl text-blue-700 hover:underline">
                <Link href={project.link} target="_blank" rel="noopener noreferrer">
                  {project.title}
                </Link>
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
      )}
    </div>
  );
}