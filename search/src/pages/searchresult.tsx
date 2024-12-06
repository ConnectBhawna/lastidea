import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	Loader2Icon,
	Search,
	TableIcon as TableOfContents,
} from "lucide-react";
import { performQueryDryrun } from "../actions";

import Spline from "@splinetool/react-spline";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../components/ui/tooltip";

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
	const [hasSearched, setHasSearched] = useState<boolean>(false);

	useEffect(() => {
		const searchQuery = location.state?.query;
		if (searchQuery) {
			setQuery(searchQuery);
			performSearch(searchQuery);
		}
	}, [location.state]);

	const performSearch = async (searchTerm: string) => {
		setLoading(true);
		setHasSearched(true);
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
			performSearch(query);
		}
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSearch();
		}
	};

	const goToIndexPage = () => {
		navigate("/index");
	};

	return (
		<main className="w-full h-screen bg-black relative">
			<div className="w-full z-10 h-[100%] absolute touch-none pointer-events-none bg-gradient-to-b from-black/20 to-black top-0 left-0" />
			<Spline
				scene="https://prod.spline.design/FQ5bVLNMRZ3SN87K/scene.splinecode"
				className="scale-[100%]"
			/>

			<div className="absolute z-20 top-0 left-0 w-full h-screen overflow-hidden bg-">
				<div className="max-w-4xl px-6 py-8 mx-auto">
					<div className="flex gap-2 items-center mb-8 ">
						<TooltipProvider delayDuration={0}>
							<Tooltip>
								<TooltipTrigger>
									<button
										type="button"
										onClick={goToIndexPage}
										className="p-2 font-semibold relative text-white transition-colors bg-purple-700 rounded-xl"
										aria-label="Go to Index Page"
									>
										<TableOfContents size={18} />
									</button>
								</TooltipTrigger>
								<TooltipContent side="bottom">
									<p>Index yourself</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<div className="flex relative flex-grow">
							<input
								type="text"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder="Search projects..."
								className="flex-grow text-white px-4 py-2 shadow-2xl relative z-10 animate-in fade-in-0 outline-none placeholder-neutral-400 w-full smooth-transition bg-neutral-200 h-full rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md transition-all bg-opacity-10 border-2 border-neutral-700  hover:border-neutral-600 "
								aria-label="Search projects"
							/>

							<button
								type="button"
								className="absolute z-10 top-[50%] hover:text-white focus:text-white text-neutral-400 -translate-y-1/2 right-4 smooth-transition"
								onClick={handleSearch}
								aria-label="Search"
							>
								<Search size={18} />
							</button>
						</div>
					</div>

					{loading ? (
						<div className="text-center flex items-center justify-center gap-2 font-semibold text-purple-300">
							<Loader2Icon className="animate-spin text-purple-300" />
							Loading results...
						</div>
					) : results.length > 0 ? (
						<div className="space-y-6">
							{results.map((project, index) => (
								<ProjectCard key={project.link} project={project} index={index}/>
							))}
						</div>
					) : hasSearched && query ? (
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
									aria-label="Go to Index Page"
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

const ProjectCard = ({
	project,
	index,
}: { project: Project; index: number }) => {
	const [showFullDescription, setShowFullDescription] =
		useState<boolean>(false);
	const truncateDescription = (desc: string, maxLength = 160) => {
		return desc.length > maxLength
			? `${desc.substring(0, maxLength)}...`
			: desc;
	};
	return (
		<div className="bg-neutral-900 relative bg-opacity-50 backdrop-blur-lg rounded-lg p-4 border border-neutral-700 transition-all duration-300 hover:border-purple-500">
			<span className="text-6xl right-4 top-2 font-black absolute text-neutral-200/10">{index}</span>
			<h2 className="text-2xl font-semibold text-purple-300 mb-1">
				#{project.title}
			</h2>
			<a
				href={project.link}
				target="_blank"
				className="text-xs text-neutral-500 hover:text-neutral-400 mb-2 block"
				rel="noreferrer"
			>
				Link {project.link}
			</a>
			<div className="text-sm text-neutral-300">
				<p className="mr-2">
					{showFullDescription
						? project.description
						: truncateDescription(project.description)}
				</p>
				<button
					type="button"
					className="text-neutral-500"
					onClick={() => {
						setShowFullDescription((prev) => !prev);
					}}
				>
					{showFullDescription ? "Read less" : "Read more"}
				</button>
			</div>

			{project.twitter && (
				<a
					href={project.twitter}
					target="_blank"
					className="text-xs text-neutral-500 hover:text-neutral-400 mt-2 block"
					rel="noreferrer"
				>
					Link {project.twitter}
				</a>
			)}
		</div>
	);
};
