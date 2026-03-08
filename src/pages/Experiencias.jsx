import { travesias } from "../data/travesias"

export default function Experiencias() {

  const tipos = [
    { id: "arena", titulo: "Arena" },
    { id: "barro", titulo: "Barro" },
    { id: "nieve", titulo: "Nieve" },
    { id: "solidaria", titulo: "Solidaria" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white pt-32 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl md:text-6xl font-black uppercase mb-16 text-center tracking-widest">
          Travesías
        </h1>

        <div className="grid md:grid-cols-3 gap-10">

          {tipos.map((tipo) => (

            <div
              key={tipo.id}
              className="border border-zinc-700 rounded-2xl p-10 text-center"
            >

              <h3 className="text-3xl font-black mb-4 text-lime-400">
                {tipo.titulo}
              </h3>

              <p className="text-zinc-400 mb-6">
                Explorá nuestras aventuras en {tipo.titulo}.
              </p>

              <a
                href="/galeria"
                className="bg-lime-400 text-black px-6 py-2 rounded-lg font-semibold"
              >
                Ver aventuras
              </a>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}