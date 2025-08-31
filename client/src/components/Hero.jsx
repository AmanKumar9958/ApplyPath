import { useContext, useEffect, useRef, useState } from 'react'
import { MdLocationOn } from 'react-icons/md'
import { AppContext } from '../context/AppContext';
import JobListing from './JobListing';

const LazyImage = ({src, alt, className=''}) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const imgEl = ref.current
        if(!imgEl) return;

        // if browser supports
        if('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if(entry.isIntersecting){
                            setVisible(true)
                            observer.unobserve(entry.target)
                        }
                    })
                },
                {rootMargin: '200px'}
            )
            observer.observe(imgEl)
            return () => observer.disconnect()
        }
        setVisible(true)
    }, [])

    return(
        <div ref={ref} className={`w-full h-full flex items-center justify-center ${className}`}>
            {!visible ? (
                <div className="w-16 h-8 md:w-28 md:h-12 bg-gray-100 rounded-md animate-pulse" aria-hidden />
            ) : (
                <img 
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className={`max-h-10 md:max-h-12 object-contain transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setLoaded(true)}
                />
            )}
        </div>
    )
}

const Hero = () => {

    const { setSearchFilter, setIsSearched} = useContext(AppContext)

    const titleRef =useRef(null);
    const locationRef =useRef(null);

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true);
    }

    const images = [
        { imageUrl: 'images/adobe_logo.png', alt: "Adobe Logo" },
        { imageUrl: 'images/amazon_logo.png', alt: "Amazon Logo" },
        { imageUrl: 'images/accenture_logo.png', alt: "Accenture Logo" },
        { imageUrl: 'images/microsoft_logo.svg', alt: "Microsoft Logo" },
        { imageUrl: 'images/samsung_logo.png', alt: "Samsung Logo" },
        { imageUrl: 'images/walmart_logo.svg', alt: "Walmart Logo" }
    ]

    return (
        <div>
            <div>
                {/* main hero section */}
                <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white rounded-2xl min-h-[50vh] flex flex-col items-center justify-center px-6 shadow-lg pb-4">
            
                    {/* Heading */}
                    <h1 className="text-3xl md:text-5xl font-extrabold text-center leading-snug">
                        Over <span className="text-yellow-300">10,000+</span> jobs to apply
                    </h1>
                    
                    {/* Subtext */}
                    <p className="text-center mt-3 text-base md:text-lg opacity-90 max-w-2xl">
                        Your <span className="bg-indigo-600 px-2 py-1 rounded-lg font-semibold animate-pulse transition-all duration-200">next big career</span> move starts right here – 
                        Explore the <span className="text-yellow-400 font-semibold">best opportunities</span> and take the first step toward your future.
                    </p>

                    {/* Search Bar */}
                    <div className="mt-8 flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-xl overflow-hidden shadow-md">
                        {/* Job Search */}
                        <div>
                            <input
                                type="text"
                                placeholder="Search for jobs"
                                className="px-4 py-3 w-full text-gray-800 outline-none text-sm md:text-base"
                                ref={titleRef}
                            />
                        </div>
                        {/* Location Search */}
                        <div className="flex items-center border-2 border-gray-300 px-2 py-3 w-full">
                            <MdLocationOn className="text-gray-500 text-xl mr-2" />
                            <input
                                type="text"
                                placeholder="Location"
                                className="w-full text-gray-800 outline-none text-sm md:text-base"
                                ref={locationRef}
                            />
                        </div>
                        <button onClick={onSearch} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-white font-semibold hover:cursor-pointer transition-all">
                            Search
                        </button>
                    </div>
                </div>

                {/* trusted by section */}
                <div className="flex flex-col items-center mt-12 px-4">
                    {/* Heading */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="h-[2px] w-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"></span>
                        <p className="font-semibold text-gray-700 text-lg md:text-xl">Trusted By</p>
                        <span className="h-[2px] w-10 bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full"></span>
                    </div>

                    {/* Logos */}
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 max-w-5xl">
                        {images.map((image, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center bg-white rounded-xl shadow-sm hover:shadow-lg transition transform hover:scale-105 w-24 h-12 md:w-32 md:h-16"
                        >
                            <LazyImage src={image.imageUrl} alt={image.alt} />
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <hr className='my-3' />
            <JobListing />
        </div>
    )
}

export default Hero
