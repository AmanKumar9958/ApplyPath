import React, { useEffect, useState } from 'react'
import { X, Mail, Lock, Building2, Eye, EyeOff, UploadCloud, Image as ImageIcon } from 'lucide-react'

// Props: open (bool), onClose (fn)
const RecruiterLogin = ({ open = false, onClose = () => {} }) => {
    const [mode, setMode] = useState('login') // 'login' | 'signup'
    const [company, setCompany] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPwd, setShowPwd] = useState(false)
    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);
    const [image, setImage] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');

    // Reset to defaults whenever modal opens
    useEffect(() => {
        if (open) {
            setMode('login');
            setCompany('');
            setEmail('');
            setPassword('');
            setShowPwd(false);
            setIsTextDataSubmitted(false);
            setImage(null);
            setLogoPreview('');
        }
    }, [open]);

    // Create object URL preview when image changes
    useEffect(() => {
        if (!image) {
            if (logoPreview) URL.revokeObjectURL(logoPreview)
            setLogoPreview('')
            return
        }
        const url = URL.createObjectURL(image)
        setLogoPreview(url)
        return () => URL.revokeObjectURL(url)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image])

    // Close on ESC
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape' && open) onClose()
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [open, onClose])

    // Prevent scroll when open
    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = '' }
    }, [open])

    if (!open) return null

    const heading = mode === 'login' ? 'Recruiter Login' : 'Create Recruiter Account'
    const sub = mode === 'login' ? 'Welcome back! Please login' : 'Join as a recruiter to post jobs'

    const submit = (e) => {
        e.preventDefault()
        if (mode === 'signup' && !isTextDataSubmitted) {
            // Move to logo upload step
            setIsTextDataSubmitted(true)
            return
        }
        // TODO: Hook up auth API and upload logo if provided.
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <button
                aria-label="Close"
                className="absolute inset-0 w-full h-full bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl">
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute right-3 top-3 p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>

                    <form onSubmit={submit} className="p-6">
                        <div className="mb-5">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{heading}</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{sub}</p>
                            {mode === 'signup' && isTextDataSubmitted && (
                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Optional: Add your company logo to enhance your profile.</p>
                            )}
                        </div>

                        {mode === 'signup' && !isTextDataSubmitted && (
                            <label className="block mb-3">
                                <span className="text-sm text-gray-700 dark:text-gray-300">Company Name</span>
                                <div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2">
                                    <Building2 className="w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Company Name"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                                        required
                                    />
                                </div>
                            </label>
                        )}

                        {!isTextDataSubmitted && (
                            <label className="block mb-3">
                                <span className="text-sm text-gray-700 dark:text-gray-300">Email</span>
                                <div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2">
                                    <Mail className="w-4 h-4 text-gray-500" />
                                    <input
                                        type="email"
                                        placeholder="you@company.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                                        required
                                    />
                                </div>
                            </label>
                        )}

                        {!isTextDataSubmitted && (
                            <label className="block mb-4">
                                <span className="text-sm text-gray-700 dark:text-gray-300">Password</span>
                                <div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2">
                                    <Lock className="w-4 h-4 text-gray-500" />
                                    <input
                                        type={showPwd ? 'text' : 'password'}
                                        placeholder="********"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowPwd(v => !v)} className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                        {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </label>
                        )}

                        {mode === 'signup' && isTextDataSubmitted ? (
                            <div className="space-y-3">
                                <label className="block">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Company Logo</span>
                                    <div className="mt-1 flex items-center gap-3 p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/40">
                                        {logoPreview ? (
                                            <img src={logoPreview} alt="Logo preview" className="w-12 h-12 rounded-md object-cover border border-gray-200 dark:border-gray-700" />
                                        ) : (
                                            <ImageIcon className="w-10 h-10 text-gray-400" />
                                        )}
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-700 dark:text-gray-300">Upload company logo</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, or SVG • up to 2MB</p>
                                        </div>
                                        <label className="text-white inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                                            <UploadCloud className="w-4 h-4" /> Choose file
                                            <input
                                                type="file"
                                                accept=".png,.jpg,.jpeg,.webp,.svg"
                                                className="hidden"
                                                onChange={(e) => setImage(e.target.files?.[0] || null)}
                                            />
                                        </label>
                                    </div>
                                </label>
                                <div className="flex items-center gap-2">
                                    <button type="button" onClick={() => onClose()} className="text-white flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">Skip for now</button>
                                    <button type="submit" className="flex-1 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Save & Finish</button>
                                </div>
                                <button type="button" onClick={() => setIsTextDataSubmitted(false)} className="w-full text-xs text-gray-500 hover:underline">Back to details</button>
                            </div>
                        ) : (
                            <button type="submit" className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
                                {mode === 'login' ? 'Login' : 'Continue'}
                            </button>
                        )}

                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 text-center">
                            {mode === 'login' ? (
                                <>
                                    New to ApplyPath?{' '}
                                    <button
                                        type="button"
                                        onClick={() => { setMode('signup'); setIsTextDataSubmitted(false); setImage(null); setLogoPreview(''); }}
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        Create an account
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => { setMode('login'); setIsTextDataSubmitted(false); setImage(null); setLogoPreview(''); }}
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        Login
                                    </button>
                                </>
                            )}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RecruiterLogin