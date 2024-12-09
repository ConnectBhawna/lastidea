import { Link } from "react-router-dom";

function HeroSection(){
    return <div className="w-full min-h-screen flex items-center justify-center px-4 py-16 bg-[url('static/images/BG-Grid.svg')] bg-cover bg-center">
        <div className="flex flex-col items-center justify-center w-full max-w-4xl space-y-6 text-center">
            <div className='absolute left-0 right-0 flex justify-center gap-4 floating-icons top-20'>
                <span className='icon forward forward-second' style={{padding:"0.4rem 0.7rem"}}><i className="fa-brands fa-github"></i></span>
                {/* <span className='hidden icon backward backward-first sm:block' style={{padding:"0.3rem .6rem"}}><i className="fa-solid fa-shield"></i></span> */}
                <span className='icon backward backward-second'><i className="fa-solid fa-sliders"></i></span>
            </div>
            
            <BannerTitle/>
            <Heading/>
            <SubHeading/>
            <NPMCopyText/>
            <Buttons/>
            
            <div className='absolute left-0 right-0 flex justify-center floating-icons bottom-20'>
                <span className='hidden icon backward backward-first sm:block' style={{background:"#156ec9", padding:"0.3rem .6rem"}}><i className="fa-solid fa-robot"></i></span>
            </div>
        </div>
    </div>
}

// The rest of the component functions remain the same as in the original code
function BannerTitle(){
    return <>
        <a target="_blank" href="https://www.npmjs.com/package/arweave-indexer">
            <p className="flex items-center justify-center gap-2 px-4 py-1 text-xs m-2 bg-[#101015] rounded-full border border-[#202029] cursor-pointer">
                Live Now at 
                <span className="text-lg bg-gradient-to-r from-[#9ee22f] to-white bg-clip-text text-transparent">
                    <i className="fa-brands fa-npm"></i>
                </span> 
                Registry
            </p>
        </a>
    </>
}

function Heading(){
    return <>
        <h1 className="p-4 mb-2 text-5xl font-bold leading-tight sm:text-6xl">
            Search, Scroll, and browse on
                <span style={{ boxShadow: "0px 3px 0px 0px #78c94a", margin: ".4rem", padding:"0 .4rem"}}>AR .</span>
            Indexer in Action.
        </h1>
    </>
}

function SubHeading(){
    return <>
        <h4 className="font-light text-lg w-[85%] max-w-xl text-gray-300">
        Indexer is a pre-built component. Install it, customize 
        prompts, and you're ready to go—no additional coding required.
        </h4>
    </>
}

function NPMCopyText(){
    let copyHandler=(e)=>{
        navigator.clipboard.writeText("npm i arweave-indexer");
        e.target.innerText="Copied";
        setTimeout(()=>
            e.target.innerHTML=`<i className="fa-solid fa-copy"></i>npm i arweave-indexer`
        ,1000
    )}

    return <button onClick={copyHandler}
    className="flex items-center justify-center gap-2 px-6 py-4 mt-6 text-base m-2 bg-[#101015] rounded-lg border border-[#202029] cursor-pointer hover:bg-[#1a1a1f] transition-colors">
    <i className="fa-solid fa-copy"></i> npm i arweave-indexer
</button>
}

function Buttons(){
    return <>
        <div className="flex items-center gap-4 mt-8">
            <a href="http://hagrid-one.vercel.app/">
                <button className="text-base font-medium tracking-tight px-6 py-3 cursor-pointer duration-200 hover:bg-[#9de22fdf] rounded-full text-black bg-[#9ee22f]">
                Npm Implementation</button>
            </a>
            <a href="https://www.npmjs.com/package/arweave-indexer" target="_blank">
                <button className="flex items-center justify-center gap-2 text-base font-medium tracking-tight px-6 py-3 cursor-pointer duration-200 hover:bg-[#243022df] rounded-full text-white bg-[#101015] border border-[#1d1d22]">
                    <i className="fa-brands fa-github"></i> 
                    Download Package
                </button>
            </a>
        </div>
    </>
}

export default function HomePage() {
    return <div className="flex flex-col w-full min-h-screen text-white bg-black">
        <HeroSection/>
    </div>
}