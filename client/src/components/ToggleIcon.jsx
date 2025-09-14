import React, { useEffect, useState } from "react";
import { DarkSide } from "@theme-toggles/react";
import "@theme-toggles/react/css/DarkSide.css";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaRegMoon } from "react-icons/fa";

const ToggleIcon = () => {
    const [isDark, setIsDark] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // On mount, read from localStorage or system preference
    useEffect(() => {
        const userPrefersDark =
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);

        setIsDark(userPrefersDark);

        if (userPrefersDark) {
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        // Prevent multiple clicks while animating
        if (isAnimating) return;

        setIsAnimating(true);
        const nextIsDark = !isDark;

        // After the animation duration, update the theme and state
        setTimeout(() => {
            if (nextIsDark) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
            }
            setIsDark(nextIsDark);
            setIsAnimating(false);
        }, 300); // A little longer than the animation duration
    };

    return (
        <div className="relative">
            {/* The actual toggle button */}
            {/* <DarkSide
                toggled={isDark}
                duration={750}
                onToggle={toggleTheme}
                style={{ fontSize: '1.5rem' }} // Example: makes the toggle larger
            /> */}
            <div onClick={toggleTheme} className="cursor-pointer">
                {isDark ? <FaSun size={19} /> : <FaRegMoon size={19} />}
            </div>

            {/* The full-screen animation overlay */}
            <AnimatePresence>
                {isAnimating && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 100 }}
                        exit={{ opacity: 0 }} // Optional: fade out
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        // This div is the expanding circle.
                        // It's positioned near the button, is circular, and starts small.
                        className={`fixed top-5 right-5 h-8 w-8 rounded-full z-[9999]
                           ${isDark ? 'bg-white' : 'bg-slate-900'}`
                        }
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ToggleIcon;