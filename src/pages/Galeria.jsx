import { useState } from "react"
import { travesias } from "../data/travesias"
import { Link } from "react-router-dom"

export default function Galeria() {

  const [filtro, setFiltro] = useState("todas")

  const filtradas =
    filtro === "todas"
      ? travesias
      : travesias.filter((t) => t.tipo === filtro)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white pt-28 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black uppercase text-center mb-12">
          Galería <span className="text-lime-400">Off-Road</span>
        </h1>

        <div className="flex justify-center gap-4 mb-16 flex-wrap">

          {["Todas", "Arena", "Barro", "Nieve","Solidaria"].map((tipo) => (

            <button
              key={tipo}
              onClick={() => setFiltro(tipo)}
              className={`px-6 py-2 rounded-xl border transition ${
                filtro === tipo
                  ? "bg-lime-400 text-black border-lime-400"
                  : "border-zinc-600 hover:border-lime-400"
              }`}
            >
              {tipo}
            </button>

          ))}

        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {filtradas.map((t) => (

            <Link
              key={t.id}
              to={`/galeria/${t.id}`}
              className="group relative overflow-hidden rounded-2xl h-80"
            >

              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition duration-700"
                style={{ backgroundImage: `url(${t.portada})` }}
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-10 h-full flex flex-col justify-end p-6">

                <h3 className="text-2xl font-bold">
                  {t.titulo}
                </h3>

                <p className="text-sm text-zinc-300">
                  {t.fecha}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>
  )
}