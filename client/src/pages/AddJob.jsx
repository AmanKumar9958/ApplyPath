import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // <-- IMPORT QUILL'S CSS
import { JobCategories, JobLocations } from '../data/assets';

const AddJob = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('New Delhi');
    const [category, setCategory] = useState('Programming');
    const [level, setLevel] = useState('Beginner');
    const [salary, setSalary] = useState('');
    // State for the editor content will be needed when submitting
    const [description, setDescription] = useState('');

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        // Initiate quill only once
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link'],
                        ['clean']
                    ],
                },
                placeholder: 'Describe the job responsibilities, required skills, and qualifications...'
            });

            // Listen for changes in the editor
            quillRef.current.on('text-change', () => {
                setDescription(quillRef.current.root.innerHTML);
            });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the form submission, e.g., send data to an API
        const jobData = {
            title,
            description,
            category,
            location,
            level,
            salary: Number(salary),
        };
        console.log('Submitting Job Data:', jobData);
        // Add your submission logic here (e.g., API call)
    };

    // Shared styles for form inputs
    const inputStyle = "w-full mt-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors";

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create a New Job Post</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Title */}
                <div>
                    <label htmlFor="job-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Job Title
                    </label>
                    <input
                        id="job-title"
                        type="text"
                        placeholder="e.g., Senior Frontend Developer"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        className={inputStyle}
                    />
                </div>

                {/* Job description with rich editor */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Job Description
                    </label>
                    <div className="mt-2 quill-container">
                        <div ref={editorRef} style={{ minHeight: '150px' }}></div>
                    </div>
                </div>

                {/* Grid for smaller fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div>
                        <label htmlFor="job-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Job Category
                        </label>
                        <select id="job-category" onChange={e => setCategory(e.target.value)} value={category} className={inputStyle}>
                            {JobCategories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="job-location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Job Location
                        </label>
                        <select id="job-location" onChange={e => setLocation(e.target.value)} value={location} className={inputStyle}>
                            {JobLocations.map((location, index) => (
                                <option key={index} value={location}>{location}</option>
                            ))}
                        </select>
                    </div>

                    {/* Level */}
                    <div>
                        <label htmlFor="job-level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Experience Level
                        </label>
                        <select id="job-level" onChange={e => setLevel(e.target.value)} value={level} className={inputStyle}>
                            {"Beginner,Intermediate,Expert".split(",").map((level, index) => (
                                <option key={index} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>

                    {/* Salary */}
                    <div>
                        <label htmlFor="job-salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Annual Salary (INR)
                        </label>
                        <input
                            id="job-salary"
                            type="number"
                            placeholder="e.g., 90000"
                            value={salary}
                            onChange={e => setSalary(e.target.value)}
                            className={inputStyle}
                            min="0"
                        />
                    </div>
                </div>

                {/* Add button */}
                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center px-6 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-colors"
                    >
                        Post Job
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddJob;