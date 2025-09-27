import React, { useRef, useState } from 'react'
import { assets, jobsApplied } from '../data/assets'
import moment from 'moment'
import { Download, Edit3, Save, X, UploadCloud, FileText } from 'lucide-react'

const statusColors = {
    Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    Accepted: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    Rejected: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
}

const Applications = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [resumeFile, setResumeFile] = useState(null)
    const [resumeUrl, setResumeUrl] = useState('')
    const fileInputRef = useRef(null)

    const handlePickFile = () => fileInputRef.current?.click()
    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setResumeFile(file)
            const url = URL.createObjectURL(file)
            setResumeUrl(url)
        }
    }
    const handleSave = () => {
        // In real app, upload to storage here; we keep local preview.
        setIsEdit(false)
    }
    const handleCancel = () => {
        setIsEdit(false)
        setResumeFile(null)
        setResumeUrl('')
    }

    return (
        <div className="px-4 md:px-8 lg:px-12 py-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Resume card */}
                <section className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-6">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Resume</h2>
                    {!isEdit ? (
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40">
                                <img src={assets.resume_selected} alt="Resume" className="w-10 h-10" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Resume</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF or DOCX • up to 5MB</p>
                                </div>
                                <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                                    <Download className="w-4 h-4" /> Download
                                </button>
                            </div>
                            <button
                                onClick={() => setIsEdit(true)}
                                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                <Edit3 className="w-4 h-4" /> Edit resume
                            </button>
                        </div>
                    ) : (
                        <div className="mt-4">
                            <input
                                ref={fileInputRef}
                                type="file"
                                id="resume"
                                name="resume"
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <div className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/40">
                                <img src={assets.upload_area} alt="Upload" className="w-12 h-12" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700 dark:text-gray-300">Upload Resume</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF or DOCX • up to 5MB</p>
                                    {resumeFile && (
                                        <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">Selected Resume: {resumeFile?.name || 'No file selected'}</p>
                                    )}
                                </div>
                                <button
                                    onClick={handlePickFile}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    <UploadCloud className="w-4 h-4" /> Choose file
                                </button>
                            </div>
                            {resumeUrl && (
                                <a
                                    href={resumeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-3 inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    <FileText className="w-4 h-4" /> Preview selected file
                                </a>
                            )}
                            <div className="mt-4 flex items-center gap-2">
                                <button onClick={handleSave} className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                                    <Save className="w-4 h-4" /> Save
                                </button>
                                <button onClick={handleCancel} className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <X className="w-4 h-4" /> Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </section>

                {/* Jobs applied table */}
                <section className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Jobs Applied</h2>
                    </div>
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-600 dark:text-gray-300">
                                    <th className="py-2 pr-4 font-semibold">Company</th>
                                    <th className="py-2 pr-4 font-semibold">Job Title</th>
                                    <th className="py-2 pr-4 font-semibold">Location</th>
                                    <th className="py-2 pr-4 font-semibold">Date</th>
                                    <th className="py-2 pr-2 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobsApplied.map((job, idx) => (
                                    <tr key={`${job.company}-${idx}`} className="border-t border-gray-100 dark:border-gray-800">
                                        <td className="py-3 pr-4">
                                            <div className="flex items-center gap-3">
                                                <img src={job.logo} alt={`${job.company} logo`} className="w-8 h-8 rounded-md bg-white object-contain border border-gray-200 dark:border-gray-800" />
                                                <span className="text-gray-800 dark:text-gray-200 font-medium">{job.company}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">{job.title}</td>
                                        <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">{job.location}</td>
                                        <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">{moment(job.date).format('ll')}</td>
                                        <td className="py-3 pr-2">
                                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[job.status] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
                                                {job.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Applications