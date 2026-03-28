import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { lazy, Suspense } from "react"

import Navbar from "./components/Navbar"
import MascotaPeeker from "./components/MascotaPeeker" // 👈 NUEVO

const Home = lazy(() => import("./pages/Home"))
const Experiencias = lazy(() => import("./pages/Experiencias"))
const Galeria = lazy(() => import("./pages/Galeria"))
const Travesia = lazy(() => import("./pages/Travesia"))
const Tienda = lazy(() => import("./pages/Tienda"))
const Contacto = lazy(() => import("./pages/Contacto"))

export default function App() {
  const location = useLocation()

  return (
    <>
      <Navbar />

      {/* 🐀 Mascota global */}
      <MascotaPeeker />

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen text-white">
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
              path="/tienda"
              element={
                <PageWrapper>
                  <Tienda />
                </PageWrapper>
              }
            />

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
    <motion.div
      className="relative min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >

      {/* 🟢 Transición tipo wipe */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-lime-500 z-[999]"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        exit={{ x: "0%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {children}

    </motion.div>
  )
}