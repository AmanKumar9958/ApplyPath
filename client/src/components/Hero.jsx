import React from 'react'

const Hero = () => {
    return (
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white rounded-2xl h-[40vh] flex flex-col items-center justify-center px-4">
        
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center">
            Over 10,000+ jobs to apply
        </h1>
        
        {/* Subtext */}
        <p className="text-center mt-2 text-sm md:text-base">
            Your <span className='bg-indigo-500 p-1 font-bold rounded-xl'>next big career</span> move starts right here – Explore the best job opportunities
        </p>
        <p className="text-center text-sm md:text-base">
            And take the first step toward your future
        </p>

        {/* Search Bar */}
        <div className="mt-6 flex w-full max-w-2xl bg-white rounded-lg overflow-hidden shadow-lg">
            <input
            type="text"
            placeholder="Search for jobs"
            className="px-4 py-2 w-full text-black outline-none"
            />
            <input
            type="text"
            placeholder="Location"
            className="px-4 py-2 w-1/3 border-l text-black outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white font-medium hover:cursor-pointer">
                Search
            </button>
        </div>
        </div>
    )
}

export default Hero
