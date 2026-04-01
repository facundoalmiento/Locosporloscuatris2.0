import { lazy, Suspense } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Route, Routes, useLocation } from "react-router-dom"

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

export default function App() {
  const location = useLocation()

  return (
    <>
      <Navbar />

      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center text-white">
            Cargando aventura...
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
