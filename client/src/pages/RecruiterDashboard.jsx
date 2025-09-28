import { NavLink, Outlet } from "react-router-dom"
import { PlusCircle, ListChecks, Users2 } from 'lucide-react'

// Shared link styles
const linkBase = "inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
const linkIdle = "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
const linkActive = "text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50"

const RecruiterDashboard = () => {
    return (
        <div className="px-4 md:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Mobile top nav */}
                <nav className="md:hidden -mx-1 overflow-x-auto">
                    <ul className="flex items-center gap-2 min-w-max px-1">
                        <li>
                            <NavLink
                                to="/recruiter-dashboard/add-job"
                                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
                            >
                                <PlusCircle className="w-5 h-5" />
                                <span>Add Job</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/recruiter-dashboard/manage-jobs"
                                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
                            >
                                <ListChecks className="w-5 h-5" />
                                <span>Manage Jobs</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/recruiter-dashboard/view-applications"
                                className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}
                            >
                                <Users2 className="w-5 h-5" />
                                <span>View Applications</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* Desktop sidebar */}
                <aside className="hidden md:block md:w-64 shrink-0">
                    <div className="sticky top-20 p-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                        <ul className="space-y-1">
                            <li>
                                <NavLink
                                    to="/recruiter-dashboard/add-job"
                                    className={({ isActive }) => `${linkBase} w-full ${isActive ? linkActive : linkIdle}`}
                                >
                                    <PlusCircle className="w-5 h-5" />
                                    <span>Add Job</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/recruiter-dashboard/manage-jobs"
                                    className={({ isActive }) => `${linkBase} w-full ${isActive ? linkActive : linkIdle}`}
                                >
                                    <ListChecks className="w-5 h-5" />
                                    <span>Manage Jobs</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/recruiter-dashboard/view-applications"
                                    className={({ isActive }) => `${linkBase} w-full ${isActive ? linkActive : linkIdle}`}
                                >
                                    <Users2 className="w-5 h-5" />
                                    <span>View Applications</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* Content area */}
                <main className="flex-1 min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default RecruiterDashboard