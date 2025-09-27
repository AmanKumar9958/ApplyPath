import { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../data/assets';
import { Share2, Bookmark, Mail, CalendarDays } from 'lucide-react';
import moment from 'moment/moment';
import JobCard from '../components/JobCard';

const ApplyJob = () => {
    const { id } = useParams();

    const [jobData, setJobData] = useState(null);
    const [shareStatus, setShareStatus] = useState({ header: '', sidebar: '' });

    const { jobs } = useContext(AppContext);

    useEffect(() => {
        if (jobs.length > 0) {
            const job = jobs.find(job => String(job._id) === String(id));
            setJobData(job || null);
        }
    }, [id, jobs]);

    const handleShare = async (origin = 'header') => {
        try {
            const url = typeof window !== 'undefined' ? window.location.href : '';
            if (!url) return;

            // Prefer Web Share API if available
            if (navigator?.share) {
                await navigator.share({
                    title: `${jobData?.title || 'Job'} — ${jobData?.companyId?.name || 'ApplyPath'}`,
                    text: 'Check out this job on ApplyPath',
                    url
                });
                setShareStatus(prev => ({ ...prev, [origin]: 'shared' }));
            } else if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(url);
                setShareStatus(prev => ({ ...prev, [origin]: 'copied' }));
            } else {
                // Fallback for older browsers: execCommand copy
                const ta = document.createElement('textarea');
                ta.value = url;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                setShareStatus(prev => ({ ...prev, [origin]: 'copied' }));
            }
        } catch (err) {
            // Ignore abort error when user cancels native share sheet
            if (err?.name !== 'AbortError') {
                setShareStatus(prev => ({ ...prev, [origin]: 'error' }));
            }
        } finally {
            // Reset after a short delay
            setTimeout(() => setShareStatus(prev => ({ ...prev, [origin]: '' })), 2000);
        }
    };

    return jobData ? (
        <div className="px-4 md:px-8 lg:px-12 py-6">
            {/* Back link */}
            <div className="max-w-6xl mx-auto mb-4">
                <Link to="/all-jobs" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                    <img src={assets.left_arrow_icon} alt="Back" className="w-4 h-4 mr-2" />
                    Back to all jobs
                </Link>
            </div>

            {/* Header card */}
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                        <img src={jobData.companyId?.image || assets.company_icon} alt={jobData.companyId?.name || 'Company Logo'} className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-2xl bg-white/80 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-sm" />
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-1">{jobData.title}</h1>
                            {jobData.companyId?.name && (
                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-1">{jobData.companyId.name}</p>
                            )}
                            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <span className="hover:cursor-default inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md">
                                    <img src={assets.suitcase_icon} alt="level" className="w-4 h-4" />
                                    {jobData.level}
                                </span>
                                <span className="hover:cursor-default inline-flex items-center gap-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-md">
                                    <img src={assets.location_icon} alt="location" className="w-4 h-4" />
                                    {jobData.location}
                                </span>
                                <span className="hover:cursor-default inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-md">
                                    <img src={assets.money_icon} alt="salary" className="w-4 h-4" />
                                    ₹ {new Intl.NumberFormat('en-IN').format(jobData.salary)}
                                </span>
                                <span className="hover:cursor-default inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md">
                                    <CalendarDays className="w-4 h-4" />
                                    Posted {moment(jobData.date).fromNow()}
                                </span>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <button
                                type="button"
                                className="p-2 rounded-lg bg-white/70 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-white hover:shadow"
                                title="Save job"
                            >
                                <Bookmark className="w-5 h-5" />
                            </button>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="p-2 rounded-lg bg-white/70 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-white hover:shadow"
                                    title={shareStatus.header === 'copied' ? 'Link copied!' : shareStatus.header === 'shared' ? 'Shared!' : 'Share'}
                                    onClick={() => handleShare('header')}
                                >
                                    <Share2 className="w-5 h-5" />
                                </button>
                                {shareStatus.header && (
                                    <span className="absolute -top-8 right-0 text-xs px-2 py-1 rounded-md bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow">
                                        {shareStatus.header === 'copied' ? 'Link copied!' : shareStatus.header === 'shared' ? 'Shared!' : 'Failed'}
                                    </span>
                                )}
                            </div>
                            <a href="#apply" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold hover:cursor-pointer shadow">Apply Now</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Job description */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-6 md:p-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Job description</h2>
                        {jobData.companyId?.email && (
                            <span className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <Mail className="w-4 h-4" />
                                {jobData.companyId.email}
                            </span>
                        )}
                    </div>
                    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-h2:text-gray-900 dark:prose-h2:text-white prose-h2:font-semibold prose-h2:tracking-tight prose-p:leading-relaxed prose-ol:list-decimal prose-ol:ml-5 prose-li:my-1">
                        {/* jobData.description contains HTML; render safely */}
                        <div dangerouslySetInnerHTML={{ __html: jobData.description }} />
                    </div>
                    <div>
                        <a href="#apply" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold hover:cursor-pointer shadow">Apply Now</a>
                    </div>
                </div>

                {/* Right: More Jobs from same company */}
                <aside className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-6 md:p-8 h-fit lg:sticky lg:top-24 flex flex-col gap-2.5" id="apply">
                    <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>More Jobs from {jobData.companyId?.name}</h2>
                    {
                        jobs.filter(job => job._id !== jobData._id  && job.companyId._id === jobData.companyId._id)
                        .filter(job => true).slice(0,4)
                        .map((job, index) => <JobCard key={index} job={job} />)
                    }
                </aside>
            </div>
        </div>
    ) : (
        <div className="min-h-[40vh] flex items-center justify-center px-4">
            <div className="max-w-xl w-full text-center bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Job Not Found</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">We couldn't find the job you're looking for. It might have been removed or the link is incorrect.</p>
                <Link to="/all-jobs" className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">Go to All Jobs</Link>
            </div>
        </div>
    )
}

export default ApplyJob