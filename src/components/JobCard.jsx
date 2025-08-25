import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Heart, MapPin, MapPinIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'

const JobCard = ({ job, isMyJob, savedInt, onSavedJob = () => {} }) => {
    return (
        <Card className={'w-full'}>
            <CardHeader>
                <CardTitle className={'flex justify-between items-center font-bold text-xl'}>
                    {job.title}
                    {isMyJob && (
                        <Trash2Icon fill='red' size={18} className='text-red-500 cursor-pointer' />
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <div className='flex items-center justify-between gap-2'>
                        {job.company && (
                            <img src={job.company.logo_url} alt={job.company.name} className='w-16 h-16 object-contain' />
                        )}
                        <div className='flex items-center gap-2'>
                            <MapPinIcon size={15} /> {job.location}
                        </div>
                    </div>
                    <hr className='bg-black h-0.5' />
                    <p className='text-md text-gray-900 dark:text-white mt-2'>{job.description}</p>
                </div>
            </CardContent>
            <CardFooter>
                <div className='flex items-center gap-5'>
                    <Link to={`/jobs/${job.id}`} className='bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer p-2 rounded-lg text-black font-bold'>
                        More Details
                    </Link>
                    <Heart fill='red' size={25} stroke='red' />
                </div>
            </CardFooter>
        </Card>
    )
}


export default JobCard