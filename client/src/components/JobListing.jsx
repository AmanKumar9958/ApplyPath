import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import JobCard from './JobCard'
import { jobsData } from '../../public/images/assets'
import { IoClose } from "react-icons/io5";

const JobListing = () => {
    const JobCategories = [
        "Programming",
        "Data Science",
        "Designing",
        "Networking",
        "Management",
        "Marketing",
        "Cybersecurity",
    ]

    const JobLocations = [
        "Bangalore",
        "Washington",
        "Hyderabad",
        "Mumbai",
        "California",
        "Chennai",
        "New York"
    ]

    const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext)

    // Sidebar toggle for mobile
    const [showFilters, setShowFilters] = useState(false)

    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full px-4 md:px-8 lg:px-12">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex justify-end mb-4">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 bg-sky-500 text-white rounded-lg font-semibold hover:cursor-pointer"
                >
                    {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-[25%] lg:sticky lg:top-20 h-fit shadow-md dark:shadow-gray-700 rounded-xl p-4 mb-6 lg:mb-0">
                {/* Current search filters */}
                {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                    <div className="shadow rounded-xl p-2 flex flex-col gap-2 mb-4">
                        <h3 className="font-bold text-lg">Current Search</h3>
                        <div className="flex items-center gap-3 flex-wrap">
                            {searchFilter.title && (
                                <div className="flex justify-center items-center bg-sky-200 dark:bg-sky-700 p-2 rounded-lg gap-2">
                                    {searchFilter.title}
                                    <IoClose onClick={() => { setSearchFilter(prev => ({ ...prev, title: "" })) }} className="cursor-pointer" width={20} />
                                </div>
                            )}
                            {searchFilter.location && (
                                <div className="flex items-center justify-center bg-red-200 dark:bg-red-700 p-2 rounded-lg gap-2">
                                    {searchFilter.location}
                                    <IoClose onClick={() => { setSearchFilter(prev => ({ ...prev, location: "" })) }} className="cursor-pointer" width={20} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {/* Filters */}
                {(showFilters || window.innerWidth >= 1024) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                        {/* Category Filter */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Search By Categories</h4>
                            <ul className="space-y-2">
                                {JobCategories.map((category, index) => (
                                    <li key={index} className="flex items-center">
                                        <input type="checkbox" className="hover:cursor-pointer accent-sky-500" />
                                        <span className="ml-2">{category}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Location Filter */}
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Search By Location</h4>
                            <ul className="space-y-2">
                                {JobLocations.map((location, index) => (
                                    <li key={index} className="flex items-center">
                                        <input type="checkbox" className="hover:cursor-pointer accent-red-500" />
                                        <span className="ml-2">{location}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </aside>

            {/* Job Listings */}
            <section className="py-4 w-full lg:w-[75%]">
                <h3 className="font-bold text-xl mb-2">Latest Jobs 🚀</h3>
                <p className="mb-4">Get your desired job from top companies</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobsData.map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default JobListing
