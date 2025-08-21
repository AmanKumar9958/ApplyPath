import { useState, useRef, useEffect } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { User, BriefcaseBusiness, Bookmark, LogOut } from "lucide-react";

const CustomUserMenu = () => {
    const { signOut } = useClerk();
    const { user } = useUser();
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    // close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
        {/* Avatar button (instead of <UserButton />) */}
        <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full overflow-hidden border border-yellow-400 hover:cursor-pointer"
        >
            <img
            src={user?.imageUrl}
            alt="User avatar"
            className="w-full h-full object-cover"
            />
        </button>

        {/* Custom Dropdown */}
        {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md overflow-hidden z-50">
            <Link
                to="/user-profile"
                className="flex items-center px-3 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
            >
                <User size={16} className="mr-2" />
                Profile
            </Link>
            <Link
                to="/my-jobs"
                className="flex items-center px-3 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
            >
                <BriefcaseBusiness size={16} className="mr-2" />
                My Jobs
            </Link>
            <Link
                to="/saved-jobs"
                className="flex items-center px-3 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
            >
                <Bookmark size={16} className="mr-2" />
                Saved Jobs
            </Link>
            <button
                onClick={() => {
                signOut();
                setOpen(false);
                }}
                className="w-full text-left flex items-center px-3 py-2 bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer"
            >
                <LogOut size={16} className="mr-2" />
                Sign Out
            </button>
            </div>
        )}
        </div>
    );
};

export default CustomUserMenu;
