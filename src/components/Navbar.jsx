import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md text-white">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold">
          LPLC<span className="text-lime-400">2.0</span>
        </Link>

        <div className="hidden md:flex gap-10 font-semibold uppercase text-sm tracking-wide">

          <Link to="/travesias" className="hover:text-lime-400 transition">
            Travesías
          </Link>

          <Link to="/tienda" className="hover:text-lime-400 transition">
            Tienda
          </Link>
          
          <Link to="/galeria" className="hover:text-lime-400 transition">
            Galería
          </Link>

          <Link to="/contacto" className="hover:text-lime-400 transition">
            Contacto
          </Link>

        </div>

        <button className="bg-lime-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-lime-400 transition">
          Reservar
        </button>

      </div>
    </nav>
  )
}