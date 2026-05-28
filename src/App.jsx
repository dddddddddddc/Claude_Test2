import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import AppDemo from './pages/AppDemo'
import TicketSystem from './pages/TicketSystem'
import VoiceDashboard from './pages/VoiceDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app-demo" element={<AppDemo />} />
        <Route path="/ticket-system" element={<TicketSystem />} />
        <Route path="/voice-dashboard" element={<VoiceDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
