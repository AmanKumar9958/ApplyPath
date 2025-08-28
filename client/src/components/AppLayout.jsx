import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const AppLayout = () => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex flex-col justify-center items-center bg-gray-900 text-white">
        <Outlet />
            </main>
        <Footer />
    </div>
);

export default AppLayout;