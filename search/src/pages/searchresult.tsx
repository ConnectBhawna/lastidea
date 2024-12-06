import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { performQueryDryrun } from "../actions";

import Spline from "@splinetool/react-spline";

interface Project {
	title: string;
	link: string;
	description: string;
	twitter?: string;
}

export default function SearchPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const [query, setQuery] = useState<string>("");
	const [results, setResults] = useState<Project[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

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
			navigate("/search", { state: { query } });
		}
	};

	const truncateDescription = (desc: string, maxLength = 160) => {
		return desc.length > maxLength
			? `${desc.substring(0, maxLength)}...`
			: desc;
	};

	const goToIndexPage = () => {
		navigate("/index");
	};

	return (
		<main className="w-full h-screen reletive">
			<Spline
				scene="https://prod.spline.design/FQ5bVLNMRZ3SN87K/scene.splinecode"
				className="scale-[100%]"
			/>

			<div className="absolute top-0 left-0 w-full h-screen overflow-hidden bg-">
				<div className="max-w-4xl px-6 py-8 mx-auto">
					<div className="flex items-center mb-8 ">
						<button
							type="button"
							onClick={goToIndexPage}
							className="p-4 mr-4 text-sm text-white transition-colors bg-purple-700 rounded-full"
							title="Go to Index Page"
						>
							index me
						</button>
						<div className="flex flex-grow">
							<input
								type="text"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder="Search projects..."
								className="flex-grow px-3 py-3 text-black bg-white border border-gray-300 text-md rounded-l-md focus:outline-none focus:ring-1 focus:ring-purple-500"
								onKeyDown={(e) => e.key === "Enter" && handleSearch()}
							/>
							<button
								type="button"
								onClick={handleSearch}
								className="bg-purple-600 text-white px-3 py-1.5 text-sm rounded-r-md hover:bg-purple-700 transition-colors flex items-center"
							>
								<Search className="mr-1" size={16} />
								Search
							</button>
						</div>
					</div>

					{loading ? (
						<div className="text-center text-gray-400">Loading results...</div>
					) : results.length > 0 ? (
						<div className="space-y-6">
							{results.map((project) => (
								<div
									key={project.link}
									className="w-full h-full p-4 transition-all bg-purple-400 border rounded-lg shadow-lg hover:shadow-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30"
								>
									<h2 className="text-xl text-white hover:underline">
										<a
											href={project.link}
											target="_blank"
											rel="noopener noreferrer"
										>
											{project.title}
										</a>
									</h2>
									<p className="mb-2 text-sm text-gray-300">{project.link}</p>
									<p className="text-gray-200">
										{truncateDescription(project.description)}
									</p>
									{project.twitter && (
										<p className="mt-1 text-sm text-gray-400">
											Twitter: {project.twitter}
										</p>
									)}
								</div>
							))}
						</div>
					) : query ? (
						<div className="flex justify-center w-full mt-32 text-gray-400">
							<div className="flex flex-col items-center justify-center w-[80%]">
								<h1 className="mb-4 text-lg text-center ">
									Can't find what you're looking for? 🤔 Maybe it's time to
									index your thoughts 🧠 and dig it out yourself—hehehe! 🔍📚
								</h1>
								<button
									type="button"
									onClick={goToIndexPage}
									className="p-4 text-sm text-white bg-purple-700 rounded-full hover:shadow-lg hover:bg-purple-800"
									title="Go to Index Page"
								>
									Index Your Project Here!!
								</button>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</main>
	);
}
