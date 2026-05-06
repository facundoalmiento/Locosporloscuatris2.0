import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Route, Routes, useLocation } from "react-router-dom"

import LoadingWheel from "./components/LoadingWheel"
import Navbar from "./components/Navbar"
import { siteConfig } from "./config/site"

const Home = lazy(() => import("./pages/Home"))
const Experiencias = lazy(() => import("./pages/Experiencias"))
const Galeria = lazy(() => import("./pages/Galeria"))
const Sponsors = lazy(() => import("./pages/Sponsors"))
const Travesia = lazy(() => import("./pages/Travesia"))
const Contacto = lazy(() => import("./pages/Contacto"))
const Tienda = siteConfig.mostrarTienda ? lazy(() => import("./pages/Tienda")) : null
const MotionDiv = motion.div
const TRANSITION_DURATION_MS = 560

export default function App() {
  const location = useLocation()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const previousPathnameRef = useRef(location.pathname)

  useEffect(() => {
    if (location.pathname === previousPathnameRef.current) return undefined

    previousPathnameRef.current = location.pathname

    const startFrame = window.requestAnimationFrame(() => {
      setIsTransitioning(true)
    })

    const timer = window.setTimeout(() => {
      setIsTransitioning(false)
      window.scrollTo({ top: 0, behavior: "auto" })
    }, TRANSITION_DURATION_MS)

    return () => {
      window.cancelAnimationFrame(startFrame)
      window.clearTimeout(timer)
    }
  }, [location.pathname])

  return (
    <>
      <Navbar />

      {isTransitioning ? (
        <div className="fixed inset-0 z-[1200] flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(132,204,22,0.22),transparent_24%),linear-gradient(180deg,rgba(4,4,4,0.98)_0%,rgba(10,10,10,0.96)_45%,rgba(17,24,39,0.98)_100%)] px-6 text-white backdrop-blur-sm">
          <LoadingWheel label="Cargando aventura..." />
        </div>
      ) : null}

      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(132,204,22,0.18),transparent_24%),linear-gradient(180deg,#040404_0%,#0a0a0a_50%,#111827_100%)] px-6 text-white">
            <LoadingWheel label="Cargando aventura..." />
          </div>
        }
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />

            <Route
              path="/travesias"
              element={
                <PageWrapper>
                  <Experiencias />
                </PageWrapper>
              }
            />

            <Route
              path="/galeria"
              element={
                <PageWrapper>
                  <Galeria />
                </PageWrapper>
              }
            />

            <Route
              path="/galeria/:id"
              element={
                <PageWrapper>
                  <Travesia />
                </PageWrapper>
              }
            />

            <Route
              path="/sponsors"
              element={
                <PageWrapper>
                  <Sponsors />
                </PageWrapper>
              }
            />

            {siteConfig.mostrarTienda ? (
              <Route
                path="/tienda"
                element={
                  <PageWrapper>
                    <Tienda />
                  </PageWrapper>
                }
              />
            ) : null}

            <Route
              path="/contacto"
              element={
                <PageWrapper>
                  <Contacto />
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  )
}

function PageWrapper({ children }) {
  return (
    <MotionDiv
      className="relative min-h-screen"
      initial={{ opacity: 0.985, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0.995, y: -4 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    >
      {children}
    </MotionDiv>
  )
}
