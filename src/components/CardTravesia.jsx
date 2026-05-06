import { Link } from "react-router-dom"

export default function CardTravesia({ travesia }) {

  return (
    <Link
      to={`/galeria/${travesia.id}`}
      className="group relative h-[clamp(16rem,62vw,24rem)] cursor-pointer overflow-hidden rounded-2xl transition duration-500 hover:-translate-y-2 md:hover:-translate-y-3"
    >

      <div
        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition duration-700"
        style={{ backgroundImage: `url(${travesia.imagen})` }}
      />

      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition" />

      <div className="relative z-10 flex h-full items-end p-5 sm:p-8">

        <h3 className="break-words text-2xl font-black uppercase tracking-wide sm:text-3xl sm:tracking-wider">
          {travesia.nombre}
        </h3>

      </div>

    </Link>
  )
}
