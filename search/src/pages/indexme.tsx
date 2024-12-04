import React, { useState } from 'react';
import {
  ConnectButton,
  useConnection, useActiveAddress
} from "@arweave-wallet-kit/react";
// import { performIndexMe } from '../actions';
import { index } from 'arweave-indexer';


export default function IndexMe() {
  const { connected } = useConnection();
  const address = useActiveAddress();
  const [projectData, setProjectData] = useState({
    title: '',
    slug: '',
    description: '',
    link: '',
    twitter: '',
    tags: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // Convert tags string to array
      const tagsArray = projectData.tags.split(',').map(tag => tag.trim());
      
      const dataToSend = {
        ...projectData,
        tags: tagsArray
      };

      // Use the connected wallet address
      console.log(address)
      console.log(dataToSend)
      // const go=await performIndexMe(JSON.stringify(dataToSend));
      const result = await index(dataToSend, window.arweaveWallet);
      console.log("jooo: "+JSON.stringify(result));
      
      // Reset form after successful submission
      setProjectData({
        title: '',
        slug: '',
        description: '',
        link: '',
        twitter: '',  // Add this line
        tags: ''
      });

      alert('Project indexed successfully!');
    } catch (error) {
      console.error('Error indexing project:', error);
      alert('Failed to index project');
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-center">Index Your Project</h2>
      
      <div className="mb-4">
        <ConnectButton 
          // showBalance={true} 
          showProfilePicture={true}
        />
      </div>

      {connected ? (
        <div className="p-2 mb-4 bg-green-100 rounded">
          <p className="text-green-800">
            Wallet Connected: {address ? address.slice(0, 6) + '...' + address.slice(-4) : 'No address'}
          </p>
        </div>
      ) : (
        <div className="p-2 mb-4 bg-red-100 rounded">
          <p className="text-red-800">
            Wallet Not Connected
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-700">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={projectData.title}
            onChange={handleInputChange}
            required
            placeholder="Enter project name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block mb-1 text-sm font-medium text-gray-700">
            Project Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={projectData.slug}
            onChange={handleInputChange}
            placeholder="Enter project slug (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">
            Project Description
          </label>
          <textarea
            id="description"
            name="description"
            value={projectData.description}
            onChange={handleInputChange}
            required
            rows={3}
            placeholder="Describe your project"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="link" className="block mb-1 text-sm font-medium text-gray-700">
            Project Website
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={projectData.link}
            onChange={handleInputChange}
            placeholder="https://yourproject.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="twitter" className="block mb-1 text-sm font-medium text-gray-700">
            Twitter/X Profile
          </label>
          <input
            type="url"
            id="twitter"
            name="twitter"
            value={projectData.twitter}
            onChange={handleInputChange}
            placeholder="https://x.com/yourproject"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block mb-1 text-sm font-medium text-gray-700">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={projectData.tags}
            onChange={handleInputChange}
            placeholder="e.g. Web3, DApp, Arweave"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={!connected}
            className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${
              connected
                ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {connected ? 'Index Project' : 'Connect Wallet to Index'}
          </button>
        </div>
      </form>
    </div>
  );
}