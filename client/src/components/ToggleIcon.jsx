import React, { useEffect, useState } from "react";
import { DarkSide } from "@theme-toggles/react"
import "@theme-toggles/react/css/DarkSide.css"
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaRegMoon, FaSun } from "react-icons/fa";

const ToggleIcon = () => {
    const [isDark, setIsDark] = useState(false);
    const [animating, setAnimating] = useState(false);

    // On mount, read from localStorage or system preference
    useEffect(() => {
        if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
        setIsDark(true);
        } else {
        setIsDark(false);
        }
    }, []);

    const toggleTheme = () => {
        setAnimating(true);
        
        setTimeout(() => {
            if(isDark){
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme", "light");
                setIsDark(false);
            } else{
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme", "dark");
                setIsDark(true);
            }
            setAnimating(false);
        }, 600)
    };

    return(
        <div className="relative">
            {/* <DarkSide toggled={isDark} duration={750} onToggle={toggleTheme} /> */}
            <div onClick={toggleTheme} className="cursor-pointer">
                {isDark ? <FaSun size={19} /> : <FaRegMoon size={19} />}
            </div>
            <AnimatePresence>
                {animating && (
                <motion.div
                    initial={{ scale: 0, opacity: 0, x: "100%", y: "-100%" }}
                    animate={{ scale: 4, opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="fixed inset-0 z-[9999] bg-black dark:bg-white"
                />
                )}
            </AnimatePresence>
        </div>
    ) ;
};
export default ToggleIcon;
