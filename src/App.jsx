import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Travesia from "./pages/Travesia"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Experiencias from "./pages/Experiencias"
import Galeria from "./pages/Galeria"
import Tienda from "./pages/Tienda"
import Contacto from "./pages/Contacto"

export default function App() {

  const location = useLocation()

  return (
    <>
      <Navbar />

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
  path="/galeria/:id"
  element={
    <PageWrapper>
      <Travesia />
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
    </>
  )
}

function PageWrapper({ children }) {

  return (
    <motion.div
      className="relative"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      }}
      transition={{ duration: 0.3 }}
    >

      {/* TRANSICIÓN VERDE */}
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