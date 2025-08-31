import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import JobCard from './JobCard'
import { assets, jobsData } from '../../public/images/assets'

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

    return (
        <div className='sm:flex md:flex sm:gap-5 md:gap-5 w-full'>
            {/* Sidebar */}
            <div className='md:w-[20%] sm:w-[25%]'>
                {/* Current search filters */}
                {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                        <div className='shadow-md rounded-xl p-2 flex flex-col gap-2'>
                            <h3 className='font-bold text-lg'>Current Search</h3>
                            <div className='flex items-center gap-5'>
                                {searchFilter.title && (
                                    <div className='flex justify-center items-center bg-sky-200 p-2 rounded-lg gap-2'>
                                        {searchFilter.title}
                                        <img onClick={() => {setSearchFilter(prev => ({...prev, title:""}))}} src='/images/cross_icon.svg' alt='Cross Icon' className='cursor-pointer' />
                                    </div>
                                )}
                                {searchFilter.location && (
                                    <div className='flex items-center justify-center bg-red-200 p-2 rounded-lg gap-2'>
                                        {searchFilter.location}
                                        <img onClick={() => {setSearchFilter(prev => ({...prev, location:""}))}} src="/images/cross_icon.svg" alt="Cross Icon" className='cursor-pointer' />
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                }

                {/* Category Filter */}
                <div className='flex md:flex-col sm:flex-col gap-10'>
                    <div className='p-2'>
                        <h4 className='font-bold text-lg md:text-md'>Search By Categories</h4>
                        <ul>
                            {JobCategories.map((category, index) => (
                                <li key={index}>
                                    <input type="checkbox" name="" id="" className='hover:cursor-pointer hover:scale-110 transition-all duration-200' />
                                    {" " + category}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Location Filter */}
                    <div className='p-2'>
                        <h4 className='font-bold text-lg md:text-md'>Search By Location</h4>
                        <ul>
                            {JobLocations.map((location, index) => (
                                <li key={index}>
                                    <input type="checkbox" name="" id="" className='hover:cursor-pointer hover:scale-110 transition-all duration-200' />
                                    {" " + location}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Job Listings */}
            <section className='py-2 md:w-[80%] sm:w-[90%]'>
                <h3 className='font-bold text-xl'>Latest Jobs 🚀</h3>
                <p>Get your desired job from top companies</p>
                <div className='flex flex-col gap-2 mt-2 flex-wrap'>
                    {jobsData.map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default JobListing