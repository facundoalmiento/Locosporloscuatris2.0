import { Link } from "react-router-dom"

export default function CardTravesia({ travesia }) {

  return (
    <Link
      to={`/galeria/${travesia.id}`}
      className="group relative overflow-hidden rounded-2xl h-96 cursor-pointer transform transition duration-500 hover:-translate-y-3"
    >

      <div
        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition duration-700"
        style={{ backgroundImage: `url(${travesia.imagen})` }}
      />

      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition" />

      <div className="relative z-10 h-full flex items-end p-8">

        <h3 className="text-3xl font-black uppercase tracking-wider">
          {travesia.nombre}
        </h3>

      </div>

    </Link>
  )
}