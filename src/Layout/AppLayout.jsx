import Header from '@/components/Header'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

function useRemoveBodyScrollLock() {
    useEffect(() => {
        const observer = new MutationObserver(() => {
            if (document.body.style.overflow === "hidden") {
                document.body.style.overflow = "";
            }
        });
        observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
        return () => observer.disconnect();
    }, []);
}

const AppLayout = () => {
        useRemoveBodyScrollLock();
    return (
        <div>
            <main className='min-h-screen overflow-visible bg-gray-100 dark:bg-gray-900'>
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