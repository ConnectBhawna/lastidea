import { Link } from "react-router-dom"

export default function Navbar({pathname}){
    let atCustomize=pathname==="/customize"
    return  <>
        <div className="text-white w-full px-8 sm:px-12 py-4 flex justify-between items-center cursor-pointer fixed z-[1000] backdrop-blur-lg">
            <Link to="/">
                <div className="flex items-center gap-1 text-2xl font-semibold tracking-tight">
                <span style={{ boxShadow: "0px 3px 0px 0px #78c94a" }}>Ar</span>Indexer</div>
            </Link>
            
            <a target="_blank" href="https://www.npmjs.com/package/arweave-indexer" rel="noopener noreferrer">
                <button className="text-sm font-medium tracking-tight px-4 cursor-pointer duration-200 hover:bg-[#9de22fdf] py-2
                rounded-full text-black bg-[#9ee22f]">Documentation</button>
            </a>
        </div>
    </>
}
