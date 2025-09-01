import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const AppLayout = () => (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-gray-200 bg-white text-black">
        <Navbar />
        <main className="flex-1 px-3 mt-2">
            <Outlet />
        </main>
        <Footer />
    </div>
);

export default AppLayout;