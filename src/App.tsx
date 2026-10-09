import { MotionConfig, motion } from 'framer-motion'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { RouteCurtain, SplashLoader, type CurtainPhase } from './components/brand/Loaders'
import { BackToTop, Footer, ScrollProgress } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import Home from './pages/Home'

// Home ships in the main bundle; other pages load on demand while the route curtain covers the screen.
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Platforms = lazy(() => import('./pages/Platforms'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

const TITLES: Record<string, string> = {
  '/': 'Strategies for Excellence | RCM Solutions',
  '/services': 'Services | Strategies for Excellence',
  '/platforms': 'Platforms | Strategies for Excellence',
  '/about': 'About | Strategies for Excellence',
  '/contact': 'Contact | Strategies for Excellence',
}

export default function App() {
  const location = useLocation()
  const [ready, setReady] = useState(false)
  const [display, setDisplay] = useState(location)
  const [phase, setPhase] = useState<CurtainPhase>('idle')

  // Route changes: cover with the curtain, swap the page underneath, then reveal.
  useEffect(() => {
    if (location.pathname === display.pathname) {
      if (location.key !== display.key) setDisplay(location)
      return
    }
    setPhase('cover')
    const swap = window.setTimeout(() => {
      setDisplay(location)
      window.scrollTo({ top: 0, behavior: 'instant' })
      setPhase('reveal')
    }, 620)
    const done = window.setTimeout(() => setPhase('idle'), 1300)
    return () => {
      window.clearTimeout(swap)
      window.clearTimeout(done)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  // Warm the other page chunks once the browser is idle so navigation never waits on the network.
  useEffect(() => {
    if (!ready) return
    const id = window.setTimeout(() => {
      void import('./pages/Services')
      void import('./pages/ServiceDetail')
      void import('./pages/Platforms')
      void import('./pages/About')
      void import('./pages/Contact')
    }, 1500)
    return () => window.clearTimeout(id)
  }, [ready])

  useEffect(() => {
    document.title = TITLES[display.pathname] ?? 'Strategies for Excellence'
  }, [display.pathname])

  return (
    <MotionConfig reducedMotion="user">
      <SplashLoader onReveal={() => setReady(true)} />
      <RouteCurtain phase={phase} />
      {ready && (
        <>
          <ScrollProgress />
          <Navbar />
          <motion.main
            key={display.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen"
          >
            <Suspense fallback={<div className="min-h-screen" />}>
            <Routes location={display}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/platforms" element={<Platforms />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </motion.main>
          <Footer />
          <BackToTop />
        </>
      )}
    </MotionConfig>
  )
}
