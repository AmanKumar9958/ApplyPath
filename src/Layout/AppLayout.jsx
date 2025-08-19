import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
    return (
        <div>
            <main className='min-h-screen px-3 py-2 overflow-visible'>
                <Header />
                <Outlet />
            </main>
            <div className="py-4 text-center">
                Made with ❤️ by Aman
            </div>
        </div>
    )
}

export default AppLayout