import React, { useState, useEffect, useRef } from 'react'; // <-- Import useEffect and useRef
import { viewApplicationsPageData } from '../data/assets';
import { Download, MoreVertical } from 'lucide-react';

const ViewApplications = () => {
    const [openActionMenu, setOpenActionMenu] = useState(null);
    const menuRef = useRef(null); // <-- 1. Create a ref to hold the menu's DOM node

    const handleActionToggle = (index) => {
        setOpenActionMenu(openActionMenu === index ? null : index);
    };

    // <-- 2. Add useEffect to handle clicks outside the menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            // If the menu is open and the click is not inside the menu, close it
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenActionMenu(null);
            }
        };

        // Add event listener when a menu is opened
        if (openActionMenu !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup: remove event listener when the menu is closed or component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openActionMenu]); // <-- This effect depends on the openActionMenu state

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 lg:p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Received Applications</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Review and manage applications for your job posts.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        {/* Table headers remain the same */}
                         <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">#</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Applicant Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Job Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Resume</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Action</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {viewApplicationsPageData.map((applicant, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                {/* Table cells remain the same */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400">{index + 1}</td>
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
                                        Resume <Download className="w-4 h-4" />
                                    </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="relative inline-block text-left">
                                        <button
                                            onClick={() => handleActionToggle(index)}
                                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
                                        >
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                        
                                        {openActionMenu === index && (
                                            <div
                                                ref={menuRef} // <-- 3. Attach the ref to the menu container
                                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                                                role="menu"
                                            >
                                                <div className="py-1" role="none">
                                                    <button className="w-fit text-left px-4 py-2 text-sm text-green-700 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        Accept
                                                    </button>
                                                    <button className="w-fit text-left px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        Reject
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewApplications;