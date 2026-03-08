import { useParams, Link } from "react-router-dom"
import { travesias } from "../data/travesias"

export default function Travesia() {

  const { id } = useParams()

  const travesia = travesias.find((t) => t.id === id)

  if (!travesia) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Travesía no encontrada
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6">

      <div className="max-w-7xl mx-auto">

        <Link
          to="/galeria"
          className="text-lime-400 mb-8 inline-block hover:underline"
        >
          ← Volver a galería
        </Link>

        <h1 className="text-5xl font-black mb-4">
          {travesia.titulo}
        </h1>

        <p className="text-zinc-400 mb-12">
          {travesia.fecha}
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {travesia.fotos.map((foto, index) => (

            <img
              key={index}
              src={foto}
              alt={`${travesia.titulo} ${index}`}
              className="rounded-xl object-cover w-full h-72 hover:scale-105 transition"
            />

          ))}

        </div>

      </div>

    </div>
  )
}