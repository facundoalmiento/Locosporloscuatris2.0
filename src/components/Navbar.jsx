import { useState, useEffect } from "react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">

        <div className="text-2xl font-black tracking-wider">
          LPLC<span className="text-lime-400">2.0</span>
        </div>

        <div className="hidden md:flex gap-8 font-semibold text-sm uppercase tracking-wide">
          <a href="#" className="hover:text-lime-400 transition">Travesías</a>
          <a href="#" className="hover:text-lime-400 transition">Galería</a>
          <a href="#" className="hover:text-lime-400 transition">Tienda</a>
          <a href="#" className="hover:text-lime-400 transition">Contacto</a>
        </div>

        <button className="bg-lime-500 hover:bg-lime-400 text-black px-5 py-2 rounded-lg font-bold transition">
          Reservar
        </button>

      </div>
    </nav>
  )
}