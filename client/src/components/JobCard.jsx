import React from 'react'

const JobCard = ({ job }) => {
    return (
        <div className='border-2 border-gray-500 p-2 rounded-2xl md:w-[35%]'>
            <div>
                <img src="/images/company_icon.svg" alt="Company Logo" />
            </div>
            <h4 className='font-bold mt-1.5'>{job.title}</h4>
            <div className='flex gap-3 my-2'>
                <span className='bg-red-300 rounded-lg p-1.5'>{job.location}</span>
                <span className='bg-sky-200 rounded-lg p-1.5'>{job.level}</span>
            </div>
            <p dangerouslySetInnerHTML={{__html:job.description.slice(0, 150)}} className='my-2'></p>
            <div className='flex gap-3'>
                <button className='bg-red-300 p-1.5 rounded-xl hover:scale-110 transition-all duration-200 hover:cursor-pointer'>Apply Now</button>
                <button className='bg-sky-200 p-1.5 rounded-xl hover:scale-110 transition-all duration-200 hover:cursor-pointer'>Learn More</button>
            </div>
        </div>
    )
}

export default JobCard