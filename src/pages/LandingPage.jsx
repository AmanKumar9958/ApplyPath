import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion'
import faqs from '../data/faqs.json'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'

const LandingPage = () => {

    const { user } = useUser();
    const navigate = useNavigate();

    const role = user?.unsafeMetadata?.role;

    const handleNavigation = (path, allowedRole, errorMsg) => {
        if(role === allowedRole) {
            navigate(path);
        } else {
            toast.error(errorMsg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    return (
        <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
            {/* Hero Section */}
            <section className="text-center px-6">
                <h1 className="text-5xl sm:text-7xl font-extrabold mb-4 tracking-tight relative inline-block">
                    Find Your{" "}
                    <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent animate-pulse">
                        Dream Job
                    </span>
                    {/* Wave underline */}
                    <svg
                        className="absolute left-0 -bottom-2 w-full h-4"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                    >
                        <path
                        d="M0,10 C20,20 40,0 60,10 C80,20 100,0 120,10"
                        stroke="#FACC15"
                        strokeWidth="3"
                        fill="transparent"
                        />
                    </svg>
                    </span>
                </h1>

                <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 tracking-tight">
                    And Get{" "}
                    <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                    Hired
                    </span>
                </h1>

                <p className="text-lg sm:text-2xl mt-6 font-medium text-gray-300">
                    Explore the
                    <span className="relative inline-block mx-2">
                    <span className="font-bold text-yellow-400">thousands</span>
                    <svg
                        className="absolute left-0 bottom-0 w-full h-3"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                    >
                        <path
                        d="M0,10 C30,25 70,-5 100,10"
                        stroke="#FACC15"
                        strokeWidth="3"
                        fill="transparent"
                        />
                    </svg>
                    </span>
                    of job listings or find the perfect candidate
                </p>
            </section>


            {/* Buttons */}
            <div className="flex flex-wrap gap-5 justify-center items-center">
                {/* for candidates */}
                <Button
                    onClick={() =>
                        handleNavigation("/jobs", "candidate", "You are a recruiter, not allowed!")
                    }
                    className="hover:cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg px-6 py-3 rounded-xl shadow-lg hover:shadow-yellow-400/40 transition duration-300"
                >
                    Find Jobs
                </Button>
                {/* for recruiters */}
                <Button
                    onClick={() =>
                        handleNavigation("/post-job", "recruiter", "You are a candidate, not allowed!")
                    }
                    className="hover:cursor-pointer bg-yellow-300 hover:bg-yellow-400 text-black font-bold text-lg px-6 py-3 rounded-xl shadow-lg hover:shadow-yellow-300/40 transition duration-300"
                >
                    Post Job
                </Button>
            </div>

            {/* Banner */}
            <div className="flex justify-center px-6">
                <img src="banner.png" alt="banner" className="rounded-3xl shadow-2xl w-full max-w-5xl object-cover" />
            </div>

            {/* Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-10">
                <Card className="bg-gray-900 border border-yellow-500 hover:scale-105 hover:shadow-yellow-400/30 transition duration-300">
                    <CardHeader>
                        <CardTitle className="text-yellow-400 text-xl">For Job Seekers</CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-300">
                        <p>Search and apply for jobs, track applications, & more</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-900 border border-yellow-500 hover:scale-105 hover:shadow-yellow-400/30 transition duration-300">
                    <CardHeader>
                        <CardTitle className="text-yellow-400 text-xl">For Employers</CardTitle>
                    </CardHeader>
                    <CardContent className="text-gray-300">
                        <p>Post jobs, manage applications, & find best candidates</p>
                    </CardContent>
                </Card>
            </section>

            {/* FAQ Accordion */}
            <section className="px-6 sm:px-10 py-12 max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index + 1}`}
                            className="rounded-lg border border-yellow-500 bg-gray-950 text-gray-200 shadow-md transition-all duration-300 hover:shadow-yellow-400/30"
                        >
                            <AccordionTrigger className="flex w-full justify-between items-center px-4 py-3 text-lg font-medium text-gray-100 hover:text-yellow-300 transition-colors duration-300 hover:cursor-pointer">
                                {faq.question}
                                <span className="ml-2 transition-transform duration-300 group-data-[state=open]:rotate-180">
                                    ▼
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 text-gray-400 leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </main>
    )
}

export default LandingPage