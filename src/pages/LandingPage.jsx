import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion'
import faqs from '../data/faqs.json'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
            toast.error(errorMsg, { position: "top-right", autoClose: 3000 });
        }
    }

    const [showHero, setShowHero] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowHero(true), 100); // delay fade-in
    }, []);

    return (
        <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">

        {/* Hero Section */}
        <section className="flex justify-center items-center w-full px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl w-full">
                {/* Text */}
                <div className="max-w-xl text-center md:text-left">
                    <h1
                        className={`text-5xl sm:text-7xl font-extrabold mb-4 tracking-tight relative inline-block transition-all duration-1000 ${
                        showHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    >
                        Find Your{" "}
                        <span className="relative inline-block">
                        <span className="bg-gradient-to-r from-yellow-700 to-yellow-800 dark:from-yellow-400 dark:to-yellow-500 bg-clip-text text-transparent animate-pulse">
                            Dream Job
                        </span>
                        <svg
                            className="absolute left-0 -bottom-2 w-full h-4 animate-wiggle"
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

                    <h1
                        className={`text-5xl sm:text-7xl font-extrabold mb-6 tracking-tight transition-all duration-1000 ${
                        showHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    >
                        And Get <span className="text-yellow-500 animate-pulse">Hired</span>
                    </h1>

                    <p
                        className={`text-lg sm:text-2xl mt-10 font-medium text-gray-900 dark:text-white transition-all duration-1000 ${
                        showHero ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        Explore the
                        <span className="relative inline-block mx-2">
                        <span className="font-bold text-yellow-500">thousands</span>
                        </span>
                        of job listings or find the perfect candidate
                    </p>
                </div>

                {/* Image */}
                <div className="flex justify-center">
                    <img
                        src="girl.png"
                        alt="girl_image"
                        className="rounded-3xl max-w-md w-full"
                    />
                </div>
            </div>
        </section>


        {/* Buttons */}
        <div className="flex flex-wrap gap-5 justify-center items-center">
            <Button
            onClick={() =>
                handleNavigation("/jobs", "candidate", "You are a recruiter, not allowed!")
            }
            className="hover:cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold text-lg px-6 py-3 rounded-xl shadow-lg hover:shadow-yellow-500/40 transition transform hover:-translate-y-1 hover:scale-105 duration-300"
            >
            Find Jobs
            </Button>
            <Button
            onClick={() =>
                handleNavigation("/post-job", "recruiter", "You are a candidate, not allowed!")
            }
            className="hover:cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold text-lg px-6 py-3 rounded-xl shadow-lg hover:shadow-yellow-500/40 transition transform hover:-translate-y-1 hover:scale-105 duration-300"
            >
            Post Job
            </Button>
        </div>

        {/* Banner */}
        <div className="flex justify-center px-6">
            <img
            src="banner.png"
            alt="banner"
            className="rounded-3xl shadow-2xl w-full max-w-5xl object-cover animate-bannerZoom"
            />
        </div>

        {/* Cards */}
        <section className="flex justify-center gap-10 px-10">
            {[ 
            { title: "For Job Seekers", text: "Search and apply for jobs, track applications, & more" },
            { title: "For Employers", text: "Post jobs, manage applications, & find best candidates" }
            ].map((item, idx) => (
            <div
                key={idx}
                className={`bg-white py-5 rounded-2xl dark:bg-gray-900 border border-gray-900 dark:border-yellow-400 hover:scale-105 hover:shadow-yellow-400/30 transition transform hover:-translate-y-2 duration-300 w-full max-w-md opacity-0 animate-fadeInUp delay-${idx * 200}`}
            >
                <CardHeader>
                    <CardTitle className="text-yellow-500 text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="dark:text-white">{item.text}</CardContent>
            </div>
            ))}
        </section>

        {/* FAQ Accordion */}
        <section className="px-6 sm:px-10 py-12 max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
                <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="rounded-lg border border-gray-900 dark:border-yellow-500 bg-white dark:bg-gray-900 text-gray-900 shadow-md transition-all duration-300 hover:shadow-yellow-400/30"
                >
                <AccordionTrigger className="flex w-full justify-between items-center px-4 py-3 text-lg font-medium text-gray-900 dark:text-yellow-400 hover:text-yellow-500 transition-colors duration-300 hover:cursor-pointer">
                    {faq.question}
                    <span className="ml-2 transition-transform duration-300 group-data-[state=open]:rotate-180">
                    ▼
                    </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-black dark:text-white leading-relaxed transition-all duration-300">
                    {faq.answer}
                </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        </section>

        {/* Tailwind Animations */}
        <style>{`
            @keyframes bannerZoom {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
            }
            .animate-bannerZoom {
            animation: bannerZoom 10s ease-in-out infinite;
            }
            @keyframes wiggle {
            0%,100% { transform: translateX(0); }
            50% { transform: translateX(5px); }
            }
            .animate-wiggle {
            animation: wiggle 2s ease-in-out infinite;
            }
            @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeInUp {
            animation: fadeInUp 1s forwards;
            }
        `}</style>

        </main>
    )
}

export default LandingPage
