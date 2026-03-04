import { useState } from "react"

export default function Galeria() {

  const [imagenActiva, setImagenActiva] = useState(null)

  const imagenes = [
    "/galeria1.jpg",
    "/galeria2.jpg",
    "/galeria3.jpg",
    "/galeria4.jpg",
    "/galeria5.jpg",
    "/galeria6.jpg",
    "/galeria7.jpg",
    "/galeria8.jpg"
  ]

  return (
    <div className="bg-black text-white min-h-screen py-32 px-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black uppercase text-center mb-20">
          Galería Off-Road
        </h1>

        {/* GRID */}

        <div className="grid md:grid-cols-3 gap-6">

          {imagenes.map((img, index) => (

            <div
              key={index}
              onClick={() => setImagenActiva(img)}
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
            >

              <img
                src={img}
                className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition"></div>

            </div>

          ))}

        </div>

      </div>

      {/* LIGHTBOX */}

      {imagenActiva && (

        <div
          onClick={() => setImagenActiva(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-8 cursor-pointer"
        >

          <img
            src={imagenActiva}
            className="max-h-[90vh] max-w-[90vw] rounded-xl"
          />

        </div>

      )}

    </div>
  )
}