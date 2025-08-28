import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const {openSignIn} = useClerk();
    const {user} = useUser();
    return (
        <nav className="px-4 py-2 flex justify-between items-center border-b-2 border-b-black">
            <div>
                <Link to="/" className='hover:cursor-pointer font-bold'>ApplyPath</Link>
            </div>
            <div>
                {user ? (
                    <div className='flex gap-2 items-center'>
                        <Link to='/applications' className='border-2 border-blue-500 p-1.5 rounded-2xl hover:bg-blue-500 hover:text-white'>Applied Jobs</Link>
                        <p>|</p>
                        <p>Hi, {user.fullName}</p>
                        <UserButton />
                    </div>
                ) : (
                    <ul className="flex space-x-4">
                        <li>
                            <button className='border-2 border-blue-500 p-2 rounded-2xl hover:bg-blue-500 hover:text-white hover:cursor-pointer'>
                                Recruiter Login
                            </button>
                        </li>
                        <li>
                            <button className='bg-blue-500 p-2 rounded-2xl font-bold border-2 border-blue-500 hover:bg-transparent hover:cursor-pointer' onClick={(e) => openSignIn()}>
                                Login
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Navbar