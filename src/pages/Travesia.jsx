import { useParams } from "react-router-dom"
import { useState } from "react"
import { travesias } from "../data/travesias"

export default function Travesia() {

  const { id } = useParams()

  const travesia = travesias.find((t) => t.id === id)

  const [imagenActiva, setImagenActiva] = useState(null)

  if (!travesia) return <div className="text-white">Travesía no encontrada</div>

  return (
    <div className="bg-black text-white min-h-screen py-32 px-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black uppercase mb-16">
          {travesia.titulo}
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {travesia.fotos.map((foto, index) => (

            <div
              key={index}
              onClick={() => setImagenActiva(foto)}
              className="cursor-pointer overflow-hidden rounded-xl"
            >

              <img
                src={foto}
                className="w-full h-80 object-cover hover:scale-110 transition duration-500"
              />

            </div>

          ))}

        </div>

      </div>

      {imagenActiva && (

        <div
          onClick={() => setImagenActiva(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        >

          <img
            src={imagenActiva}
            className="max-h-[90vh] max-w-[90vw]"
          />

        </div>

      )}

    </div>
  )
}