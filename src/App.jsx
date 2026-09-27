import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'
import ParticleBackground from './components/ParticleBackground.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import JourneyPage from './pages/JourneyPage.jsx'
import EventsPage from './pages/EventsPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import VerifyCertificatePage from './pages/VerifyCertificatePage.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#05070a] text-white font-inter overflow-x-hidden">
        <Loader />
        <ScrollToTop />

        <div className="crt-grid" aria-hidden="true"></div>
        <div className="crt-glow" aria-hidden="true"></div>
        <div className="crt-vignette" aria-hidden="true"></div>
        <ParticleBackground />
        <div className="scanlines" aria-hidden="true"></div>

        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/verify-certificate" element={<VerifyCertificatePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
