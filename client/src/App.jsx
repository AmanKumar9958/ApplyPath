import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import AppLayout from './components/AppLayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/apply-job/123" element={<ApplyJob />} />
              <Route path="/applications" element={<Applications />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App