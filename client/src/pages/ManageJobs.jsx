import React, { useState, useEffect, useRef } from 'react';
import { manageJobsData } from '../data/assets';
import moment from 'moment';
import { MoreVertical, Edit, Trash2, MapPin, Calendar, Users } from 'lucide-react';

// A reusable, styled toggle switch component
const ToggleSwitch = ({ checked, onChange }) => {
    return (
        <button
            role="switch"
            aria-checked={checked}
            onClick={onChange}
            className={`${checked ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900`}
        >
            <span
                aria-hidden="true"
                className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
            />
        </button>
    );
};

const ManageJobs = () => {
    const [jobs, setJobs] = useState(manageJobsData);
    const [openActionMenu, setOpenActionMenu] = useState(null);
    const menuRef = useRef(null);

    const handleActionToggle = (index) => {
        setOpenActionMenu(openActionMenu === index ? null : index);
    };
    
    // Toggles the visibility status of a job
    const handleVisibilityToggle = (jobIndex) => {
        const updatedJobs = [...jobs];
        updatedJobs[jobIndex].visible = !updatedJobs[jobIndex].visible;
        setJobs(updatedJobs);
        // Here you would typically make an API call to update the backend
        console.log(`Job '${updatedJobs[jobIndex].title}' visibility set to ${updatedJobs[jobIndex].visible}`);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenActionMenu(null);
            }
        };
        if (openActionMenu !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openActionMenu]);
    
    // A reusable component for the action menu
    const ActionMenu = ({ index }) => (
        <div className="relative inline-block text-left">
            <button onClick={() => handleActionToggle(index)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900">
                <MoreVertical className="w-5 h-5" />
            </button>
            {openActionMenu === index && (
                <div ref={menuRef} className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                        <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Edit className="w-4 h-4" /> Edit
                        </button>
                        <button className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Trash2 className="w-4 h-4" /> Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Your Job Posts</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Edit, update, and control the visibility of your active job listings.
                </p>
            </div>

            {/* DESKTOP VIEW: TABLE */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Job Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Posted</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Applicants</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Visible</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {jobs.map((job, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{job.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{job.location}</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{moment(job.date).fromNow()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{job.applicants}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <ToggleSwitch checked={job.visible} onChange={() => handleVisibilityToggle(index)} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <ActionMenu index={index} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE VIEW: CARDS */}
            <div className="md:hidden space-y-4">
                {jobs.map((job, index) => (
                    <div key={index} className="bg-gray-50/50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-start">
                             <div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{job.title}</p>
                                <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-1"><MapPin className="w-3 h-3"/>{job.location}</p>
                            </div>
                            <ActionMenu index={index} />
                        </div>
                        <div className="mt-4 space-y-2 text-sm">
                             <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><Calendar className="w-4 h-4 text-gray-500" /> Posted {moment(job.date).fromNow()}</div>
                             <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300"><Users className="w-4 h-4 text-gray-500" /> {job.applicants} Applicants</div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Visible</span>
                            <ToggleSwitch checked={job.visible} onChange={() => handleVisibilityToggle(index)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageJobs;