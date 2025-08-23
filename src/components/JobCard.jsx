import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Heart, MapPin, MapPinIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'

const JobCard = ({ job, isMyJob, savedInt, onSavedJob = () => {} }) => {
    return (
        <div className='flex justify-center gap-2 md:justify-start'>
            <Card className={'w-11/12 md:w-1/4'}>
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
                            {job.company && <img src={job.company.logo_url} alt={job.company.name} className='w-16 h-16 object-contain' />}
                            <div className='flex items-center gap-2'>
                                <MapPinIcon size={15} /> {job.location}
                            </div>
                        </div>
                        <div>
                            <p className='text-md text-gray-300'>{job.description}</p>
                        </div>
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
        </div>
    )
}

export default JobCard