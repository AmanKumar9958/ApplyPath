import React from 'react'

const JobCard = ({ job }) => {
    return (
        <div className="shadow-lg border border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex flex-col justify-between w-full transition-transform duration-200 hover:scale-[1.02]">
            {/* Header */}
            <div className="flex items-center gap-4 mb-2">
                <img
                    src="/images/company_icon.svg"
                    alt="Company Logo"
                    className="w-14 h-14 p-1 object-contain rounded-full border border-gray-300 dark:border-gray-700"
                />
                <h4 className="font-bold text-lg text-gray-900 dark:text-white">{job.title}</h4>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-red-100 text-red-700 dark:bg-red-300 dark:text-red-900 rounded-lg px-3 py-1 text-xs font-semibold">
                    {job.location}
                </span>
                <span className="bg-sky-100 text-sky-700 dark:bg-sky-300 dark:text-sky-900 rounded-lg px-3 py-1 text-xs font-semibold">
                    {job.level}
                </span>
            </div>

            {/* Description */}
            <p
                dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
                className="my-2 text-sm"
            ></p>

            {/* Actions */}
            <div className="flex gap-3 mt-2">
                <button className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-600 transition-all duration-200 hover:scale-105 hover:cursor-pointer">
                    Apply Now
                </button>
                <button className="bg-sky-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-sky-600 transition-all duration-200 hover:scale-105 hover:cursor-pointer">
                    Learn More
                </button>
            </div>
        </div>
    )
}

export default JobCard
