import { motion } from "framer-motion"

export default function Contacto() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white pt-24 px-6">

      <div className="max-w-6xl mx-auto">

        {/* TITULO */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >

          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-4">
            Contacto <span className="text-lime-400">Off-Road</span>
          </h1>

          <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
            ¿Querés vivir una travesía extrema en cuatriciclo?
            Escribinos y te contamos todo sobre nuestras aventuras.
          </p>

        </motion.div>


        {/* GRID */}

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* FORMULARIO */}

          <motion.form
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 max-w-xl"
          >

            {/* NOMBRE */}

            <div>
              <label className="text-sm text-zinc-400">Nombre</label>

              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-lime-400 transition"
              />
            </div>

            {/* EMAIL */}

            <div>
              <label className="text-sm text-zinc-400">Email</label>

              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-lime-400 transition"
              />
            </div>

            {/* MENSAJE */}

            <div>
              <label className="text-sm text-zinc-400">Mensaje</label>

              <textarea
                rows="4"
                placeholder="Contanos qué travesía te interesa..."
                className="w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-lime-400 transition"
              />
            </div>

            {/* BOTON */}

            <button
              type="submit"
              className="w-full bg-lime-400 text-black font-bold py-3 rounded-lg hover:bg-lime-300 transition"
            >
              Enviar mensaje
            </button>

          </motion.form>


          {/* INFO */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >

            {/* WHATSAPP */}

            <div>
              <h3 className="text-xl font-bold mb-1 text-lime-400">
                WhatsApp
              </h3>

              <p className="text-zinc-400 text-sm">
                Coordiná tu travesía directamente con nosotros.
              </p>

              <p className="mt-2 font-semibold">
                +54 9 221 XXX XXXX
              </p>
            </div>

            {/* INSTAGRAM */}

            <div>
              <h3 className="text-xl font-bold mb-1 text-lime-400">
                Instagram
              </h3>

              <p className="text-zinc-400 text-sm">
                Mirá nuestras aventuras y travesías.
              </p>

              <p className="mt-2 font-semibold">
                @locosporloscuatris
              </p>
            </div>

            {/* UBICACION */}

            <div>
              <h3 className="text-xl font-bold mb-1 text-lime-400">
                Ubicación
              </h3>

              <p className="text-zinc-400 text-sm">
                Buenos Aires, Argentina
              </p>
            </div>

          </motion.div>

        </div>

      </div>

    </div>
  )
}