import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import { lazy, Suspense } from 'react';

// Dynamically import components, only when user visits the route
const Jobs = lazy(() => import('./pages/Jobs'));
const ApplyJob = lazy(() => import('./pages/ApplyJob'));
const Applications = lazy(() => import('./pages/Applications'));
const AppLayout = lazy(() => import('./components/AppLayout'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const RecruiterLogin = lazy(() => import('./components/RecruiterLogin'));
const RecruiterDashboard = lazy(() => import('./pages/RecruiterDashboard'));
const AddJob = lazy(() => import('./pages/AddJob'));
const ManageJobs = lazy(() => import('./pages/ManageJobs'));
const ViewApplications = lazy(() => import('./pages/ViewApplications'));

import 'quill/dist/quill.snow.css'  // for quill editor

// Simple loading fallback component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
  </div>
);

const App = () => {

  const {showRecruiterLogin, setShowRecruiterLogin} = useContext(AppContext);

  return (
    <div>
      <RecruiterLogin open={showRecruiterLogin} onClose={() => setShowRecruiterLogin(false)} />
      <BrowserRouter>
        <Suspense fallback={LoadingSpinner() }>
          <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/all-jobs" element={<Jobs />} />
                <Route path="/apply-job/:id" element={<ApplyJob />} />
                <Route path="/applications" element={<Applications />} />
                <Route path='/recruiter-dashboard' element={<RecruiterDashboard />}>
                  <Route index element={<Navigate to="add-job" replace />} />
                  <Route path="add-job" element={<AddJob />} />
                  <Route path="manage-jobs" element={<ManageJobs />} />
                  <Route path="view-applications" element={<ViewApplications />} />
                </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App