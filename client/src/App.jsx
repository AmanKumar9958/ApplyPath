import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Jobs from './pages/Jobs'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import AppLayout from './components/AppLayout'
import LandingPage from './pages/LandingPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<AppLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/all-jobs" element={<Jobs />} />
              <Route path="/apply-job/123" element={<ApplyJob />} />
              <Route path="/applications" element={<Applications />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App