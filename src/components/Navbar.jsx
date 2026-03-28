import { useState } from "react"
import { Link } from "react-router-dom"

export default function Navbar() {

  const [menuAbierto, setMenuAbierto] = useState(false)

  const links = [
    { to: "/travesias", label: "Travesías" },
    { to: "/tienda", label: "Tienda" },
    { to: "/galeria", label: "Galería" },
    { to: "/contacto", label: "Contacto" },
  ]

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md text-white">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold" onClick={() => setMenuAbierto(false)}>
          LPLC<span className="text-lime-400">2.0</span>
        </Link>

        {/* LINKS DESKTOP */}
        <div className="hidden md:flex gap-10 font-semibold uppercase text-sm tracking-wide">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-lime-400 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* DERECHA: botón reservar + hamburguesa */}
        <div className="flex items-center gap-4">

          <button className="bg-lime-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-lime-400 transition">
            Reservar
          </button>

          {/* HAMBURGUESA — solo en mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuAbierto ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuAbierto ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                menuAbierto ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>

        </div>

      </div>

      {/* MENÚ MOBILE */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuAbierto ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 pb-6 gap-4 font-semibold uppercase text-sm tracking-wide border-t border-white/10 pt-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-lime-400 transition"
              onClick={() => setMenuAbierto(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

    </nav>
  )
}