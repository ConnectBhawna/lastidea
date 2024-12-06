"use client";

import {useState} from "react";
import { Search, LoaderCircleIcon } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import Spline from "@splinetool/react-spline";

export default function Home() {
	const [query, setQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [searchPath, setSearchPath] = useState("");
	// const [isLoaded, setIsLoaded] = useState(false);
	// const navigate = useNavigate();

	// useEffect(() => {
	// 	// Simulate loading delay
	// 	const timeout = setTimeout(() => {
	// 		setIsLoaded(true);
	// 	}, 1000);

	// 	return () => clearTimeout(timeout);
	// }, []);

	console.log(searchPath);

	const handleSearch = () => {
		if (query.trim()) {
			setIsSearching(true);
			const timeout = setTimeout(() => {
				setSearchPath(`/search?query=${encodeURIComponent(query)}`);
				setIsSearching(false);
				// navigate("/search", { state: { query } });
			}, 2000);

			return () => clearTimeout(timeout);
		}
	};

	const demoCards = [
		{
			title: "Transaction #1",
			description: "A sample transaction on the Arweave network",
			id: "abc123",
		},
		{
			title: "Smart Contract",
			description: "Example of a deployed smart contract",
			id: "def456",
		},
		{
			title: "Data Storage",
			description: "Permanent data storage example",
			id: "ghi789",
		},
	];

	return (
		<main className="w-full bg-black min-h-screen relative overflow-x-hidden">
			<div className="w-full h-[130%] absolute touch-none pointer-events-none bg-gradient-to-b from-black/20 to-black top-0 left-0 z-10" />
			<Spline
				scene="https://prod.spline.design/RgYcaxSqePgtGoNa/scene.splinecode"
				className="scale-[200%]"
			/>

			<div
				className={`absolute ${isSearching ? "top-[45%]" : "top-[50%]"} transition-all duration-700 left-[50%] -translate-x-1/2 -translate-y-1/2 pb-16 text-white flex items-center justify-center flex-col w-full max-w-4xl h-fit z-30`}
			>
				{/* Logo and Subtitle - Conditionally Styled */}
				<div
					className={`
            		smooth-transition duration-700 ease-in-out 
					${isSearching ? "scale-[0.8] opacity-60" : "scale-100 opacity-100"}
					`}
				>
					<h1
						className={
							"text-7xl md:text-8xl uppercase leading-tight tracking-tighter text-center font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent"
						}
					>
						Hagrid
					</h1>

					<p
						className={
							"max-w-2xl font-semibold text-center text-lg md:text-xl text-neutral-300 mb-8"
						}
					>
						Search, Explore and Index the Data of the Arweave Ecosystem
					</p>
				</div>

				{/* Search Box and Enhanced Loading Animation */}
				<div className="z-40 w-full max-w-md relative mb-12">
					{!isSearching ? (
						<div className="flex relative">
							<input
								type="text"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder="Search for transaction"
								className="px-4 py-2 shadow-2xl relative z-10 bg-transparent animate-in fade-in-0 focus:border-neutral-500 outline-none placeholder-neutral-400 w-full smooth-transition"
								onKeyDown={(e) => e.key === "Enter" && handleSearch()}
							/>
							<div className="absolute mx-0 bg-neutral-200 w-full h-full rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-md transition-all bg-opacity-10 border-2 border-neutral-600" />
							<button
								type="button"
								className="absolute top-[50%] hover:text-white focus:text-white text-neutral-400 -translate-y-1/2 right-4 smooth-transition"
								onClick={handleSearch}
							>
								<Search size={18} />
							</button>
						</div>
					) : (
						<div className="flex gap-2 animate-in fade-in-0 items-center justify-center text-purple-300">
							<LoaderCircleIcon className="animate-spin" />
							<p className="text-center">Searching for "{query}"...</p>
						</div>
					)}
				</div>

				{/* Demo Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
					{demoCards.map((card) => (
						<Card
							key={card.id}
							title={card.title}
							description={card.description}
							link={card.id}
						/>
					))}
				</div>
			</div>
		</main>
	);
}

type CardType = {
	description: string;
	title: string;
	link: string;
};

const Card = ({ description, title, link }: CardType) => {
	return (
		<div className="bg-neutral-900 bg-opacity-50 backdrop-blur-lg rounded-lg p-4 border border-neutral-700 transition-all duration-300 hover:border-purple-500">
			<h3 className="text-lg font-semibold text-purple-300 mb-1">{title}</h3>
			<a href={link} target="_blank" className="text-xs text-neutral-500 mb-2 block" rel="noreferrer">Link {link}</a>
			<p className="text-sm text-neutral-300">{description}</p>
		</div>
	);
};
