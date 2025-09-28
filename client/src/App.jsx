import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Jobs from './pages/Jobs'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import AppLayout from './components/AppLayout'
import LandingPage from './pages/LandingPage'
import RecruiterLogin from './components/RecruiterLogin'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import RecruiterDashboard from './pages/RecruiterDashboard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'

const App = () => {

  const {showRecruiterLogin, setShowRecruiterLogin} = useContext(AppContext);

  return (
    <div>
      <RecruiterLogin open={showRecruiterLogin} onClose={() => setShowRecruiterLogin(false)} />
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  )
}

export default App