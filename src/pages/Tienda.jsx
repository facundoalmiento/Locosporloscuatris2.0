import { useState } from "react"
import { productos } from "../data/productos"

export default function Tienda() {

  const [categoriaActiva, setCategoriaActiva] = useState("todos")

  const productosFiltrados =
    categoriaActiva === "todos"
      ? productos
      : productos.filter(
          (producto) => producto.categoria === categoriaActiva
        )

  return (
    <div className="bg-black text-white min-h-screen py-32 px-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black uppercase text-center mb-12">
          Tienda Off-Road
        </h1>

        {/* FILTROS */}

        <div className="flex justify-center gap-6 mb-16 flex-wrap">

          <button
            onClick={() => setCategoriaActiva("todos")}
            className="border border-zinc-700 px-6 py-2 rounded-xl hover:border-lime-400 hover:text-lime-400 transition"
          >
            Todos
          </button>

          <button
            onClick={() => setCategoriaActiva("cascos")}
            className="border border-zinc-700 px-6 py-2 rounded-xl hover:border-lime-400 hover:text-lime-400 transition"
          >
            Cascos
          </button>

          <button
            onClick={() => setCategoriaActiva("guantes")}
            className="border border-zinc-700 px-6 py-2 rounded-xl hover:border-lime-400 hover:text-lime-400 transition"
          >
            Guantes
          </button>

          <button
            onClick={() => setCategoriaActiva("aceites")}
            className="border border-zinc-700 px-6 py-2 rounded-xl hover:border-lime-400 hover:text-lime-400 transition"
          >
            Aceites
          </button>

          <button
            onClick={() => setCategoriaActiva("protecciones")}
            className="border border-zinc-700 px-6 py-2 rounded-xl hover:border-lime-400 hover:text-lime-400 transition"
          >
            Protecciones
          </button>

        </div>

        {/* PRODUCTOS */}

        <div className="grid md:grid-cols-4 gap-10">

          {productosFiltrados.map((producto) => (

            <div
              key={producto.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-lime-400 transition"
            >

              <div
                className="h-56 bg-cover bg-center"
                style={{ backgroundImage: `url(${producto.imagen})` }}
              ></div>

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