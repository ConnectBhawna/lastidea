import { Link } from "react-router-dom";

export default function Footer(){
    return <>
        <div className=" text-white w-full px-8 py-4 flex justify-between items-center cursor-pointer bg-[#101015] border border-[#202029] ">
            <Link to="/">
                <div className="flex items-center gap-1 text-xl font-semibold tracking-tight cursor-pointer">
                    <span style={{ boxShadow: "0px 3px 0px 0px #78c94a" }}>Ar</span>Indexer
                </div>
            </Link>
            <div className="flex items-center gap-1 text-xs md:text-sm">
                Created <span className="hidden sm:block">and designed </span>by 
                <a target="_blank" title="Twitter" href="https://x.com/rahulsainlll">
                    <span className="text-[#9ee22f] cursor-pointer font-bold underline">Rahul Sain</span>
                </a>
            </div>
            <div className="items-center hidden gap-5 text-2xl cursor-pointer sm:flex">
                <a target="_blank" href="https://github.com/Rahulsainlll/ao-indexer">
                    <i class="fa-brands fa-github"></i>
                </a>
                <a target="_blank" href="https://www.npmjs.com/package/arweave-indexer">
                    <i class="fa-brands fa-npm"></i>
                </a>
            </div>
        </div>
    </>
}