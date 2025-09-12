import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosMenu, IoIosClose } from "react-icons/io";
import ToggleIcon from './ToggleIcon';

const Navbar = () => {
    const { openSignIn } = useClerk();
    const { user } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // closing when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
        };

        if (menuOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        } else {
        document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <nav className="px-6 py-3 flex justify-between items-center border-b border-gray-700 shadow-sm z-50 min-h-[8vh]">
            {/* Logo */}
            <div>
                <Link to="/" className="hover:cursor-pointer text-xl font-extrabold">
                    <span className="text-blue-600 dark:text-blue-400">Apply</span>
                    <span className="text-gray-800 dark:text-gray-200">Path</span>
                </Link>
            </div>

            {/* Hamburger (Mobile only) */}
            <div className='flex items-center justify-center gap-3'>
                <div className='sm:hidden md:hidden'>
                    <ToggleIcon />
                </div>
                <div>
                    <button
                        type="button"
                        className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        aria-label="Toggle menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <IoIosClose size={28} /> : <IoIosMenu size={28} />}
                    </button>
                </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-5">
                {user ? (
                    <div className="flex items-center gap-3">
                        <Link
                            to="/applications"
                            className="px-4 py-1.5 border-2 border-blue-500 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition"
                        >
                            Applied Jobs
                        </Link>
                        <span className="text-gray-400">|</span>
                        <p className="text-gray-700 dark:text-gray-200 font-medium">Hi, {user.fullName}</p>
                        <UserButton afterSignOutUrl="/" />
                        <ToggleIcon />  
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-1.5 border-2 border-blue-500 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition">
                            Recruiter Login
                        </button>
                        <button
                            className="px-4 py-1.5 bg-blue-500 text-white font-semibold rounded-full border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition"
                            onClick={() => openSignIn()}
                        >
                            Login
                        </button>
                        <ToggleIcon />
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            <div className={`bg-white dark:bg-gray-900 text-black dark:text-gray-200 md:hidden absolute left-0 right-0 top-16 bg-white border-t border-gray-200 shadow-md transform transition-transform duration-300 ${
                menuOpen ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 pointer-events-none"
            }`}
            >
                {user ? (
                    <div className="flex flex-col items-center gap-3 py-4">
                        <Link
                            to="/applications"
                            className="px-4 py-1.5 border-2 border-blue-500 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            Applied Jobs
                        </Link>
                        <p className="font-medium text-black dark:text-gray-200">Hi, {user.fullName}</p>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3 py-4">
                        <button className="px-4 py-1.5 border-2 border-blue-500 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition">
                            Recruiter Login
                        </button>
                        <button
                            className="px-4 py-1.5 bg-blue-500 text-white font-semibold rounded-full border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition"
                            onClick={() => { openSignIn(); setMenuOpen(false); }}
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
