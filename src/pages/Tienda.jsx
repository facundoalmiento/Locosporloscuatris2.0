import { productos } from "../data/productos"

export default function Tienda() {
  return (
    <div className="bg-black text-white min-h-screen py-32 px-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black uppercase text-center mb-20">
          Tienda Off-Road
        </h1>

        <div className="grid md:grid-cols-4 gap-10">

          {productos.map((producto) => (

            <div
              key={producto.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-lime-400 transition"
            >

              {/* IMAGEN */}
              <div
                className="h-56 bg-cover bg-center"
                style={{ backgroundImage: `url(${producto.imagen})` }}
              ></div>

              {/* INFO */}
              <div className="p-6">

                <h3 className="text-xl font-bold mb-2">
                  {producto.nombre}
                </h3>

                <p className="text-gray-400 text-sm mb-4">
                  {producto.descripcion}
                </p>

                <div className="flex justify-between items-center">

                  <span className="text-lime-400 font-bold">
                    {producto.precio}
                  </span>

                  <button className="border border-lime-400 px-4 py-2 rounded-lg hover:bg-lime-400 hover:text-black transition text-sm">
                    Ver
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}