import React, { useState, useEffect, useRef } from 'react';
import { viewApplicationsPageData } from '../data/assets';
import { Download, MoreVertical, Briefcase, MapPin } from 'lucide-react';

const ViewApplications = () => {
    const [openActionMenu, setOpenActionMenu] = useState(null);
    const menuRef = useRef(null);

    const handleActionToggle = (index) => {
        setOpenActionMenu(openActionMenu === index ? null : index);
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

    // A reusable component for the action menu to avoid repetition
    const ActionMenu = ({ index }) => (
        <div className="relative inline-block text-left">
            <button
                onClick={() => handleActionToggle(index)}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
            >
                <MoreVertical className="w-5 h-5" />
            </button>
            {openActionMenu === index && (
                <div
                    ref={menuRef}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    role="menu"
                >
                    <div className="py-1" role="none">
                        <button className="flex items-center w-full text-left px-4 py-2 text-sm text-green-700 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                            Accept Application
                        </button>
                        <button className="flex items-center w-full text-left px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                            Reject Application
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Received Applications</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Review and manage applications for your job posts.
                </p>
            </div>

            {/* DESKTOP VIEW: TABLE (Visible on medium screens and up) */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Applicant Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Job Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Resume</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Action</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {viewApplicationsPageData.map((applicant, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <img className="h-9 w-9 rounded-full object-cover" src={applicant.imgSrc} alt={`${applicant.name}'s profile`} />
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{applicant.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{applicant.jobTitle}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{applicant.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <a href="#" target='_blank' rel="noopener noreferrer" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors">
                                        View Resume <Download className="w-4 h-4" />
                                    </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <ActionMenu index={index} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE VIEW: CARDS (Visible only on small screens) */}
            <div className="md:hidden space-y-4">
                {viewApplicationsPageData.map((applicant, index) => (
                    <div key={index} className="bg-gray-50/50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <img className="h-10 w-10 rounded-full object-cover" src={applicant.imgSrc} alt={`${applicant.name}'s profile`} />
                                <div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{applicant.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Applied on 28 Sep, 2025</p>
                                </div>
                            </div>
                            <ActionMenu index={index} />
                        </div>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <Briefcase className="w-4 h-4 text-gray-500" />
                                <span>{applicant.jobTitle}</span>
                            </div>
                             <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span>{applicant.location}</span>
                            </div>
                            <a href="#" target='_blank' rel="noopener noreferrer" className="inline-flex w-full justify-center items-center gap-2 text-sm font-semibold py-2 px-3 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-900/50 transition-colors">
                                <Download className="w-4 h-4" />
                                Download Resume
                            </a>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default ViewApplications;