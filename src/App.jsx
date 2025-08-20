import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './Layout/AppLayout'
import { ThemeProvider } from './components/ThemeProvider'
import ProfilePage from './components/ProfilePage'
import ProtectedRoutes from './components/ProtectedRoutes'
import { ToastContainer } from 'react-toastify'
import LandingPage from './pages/LandingPage.jsx'
import JobListing from './pages/JobListing.jsx'
import JobPage from './pages/JobPage.jsx'
import PostJob from './pages/PostJob.jsx'
import SavedJobs from './pages/SavedJobs.jsx'
import MyJobs from './pages/MyJobs.jsx'
import OnBoarding from './pages/OnBoarding'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/onboarding',
        element: (
          <ProtectedRoutes>
            <OnBoarding />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/jobs',
        element: (
          <ProtectedRoutes>
            <JobListing />
          </ProtectedRoutes>
        )
      },
      {
        path: '/jobs/:id',
        element: (
          <ProtectedRoutes>
            <JobPage />
          </ProtectedRoutes>
        )
      },
      {
        path: '/post-job',
        element: (
          <ProtectedRoutes>
            <PostJob />
          </ProtectedRoutes>
        )
      },
      {
        path: '/saved-jobs',
        element: (
          <ProtectedRoutes>
            <SavedJobs />
          </ProtectedRoutes>
        )
      },
      {
        path: '/my-jobs',
        element: (
          <ProtectedRoutes>
            <MyJobs />
          </ProtectedRoutes>
        )
      },
      {
        path: '/user-profile',
        element: (
          <ProtectedRoutes>
            <ProfilePage />
          </ProtectedRoutes>
        )
      }
    ]
  }
])

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ToastContainer />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App