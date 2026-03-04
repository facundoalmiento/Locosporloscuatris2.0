export default function Home() {
  return (
    <>
      {/* HERO */}
      <div className="relative h-screen w-full bg-black flex items-center">

        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center w-full">

          {/* TEXTO IZQUIERDA */}
          <div>

            <p className="text-lime-400 font-bold tracking-widest uppercase mb-4">
              Off Road Experience
            </p>

            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] uppercase tracking-tight mb-6">
              <span className="block text-white">Locos por</span>
              <span className="block text-lime-400 drop-shadow-[0_0_30px_rgba(132,204,22,0.4)]">
                los Cuatris
              </span>
            </h1>

            <p className="text-gray-400 text-lg max-w-lg mb-8">
              Arena. Barro. Montaña.
              Travesías extremas diseñadas para quienes no quieren límites.
            </p>

            <div className="flex gap-4">
              <button className="bg-lime-500 hover:bg-lime-400 text-black font-bold px-10 py-5 rounded-xl transition duration-300 shadow-xl">
                Reservar Ahora
              </button>

              <button className="border border-gray-600 hover:border-lime-400 px-10 py-5 rounded-xl transition duration-300">
                Ver Travesías
              </button>
            </div>

          </div>

          {/* BLOQUE DERECHO (Mascota futura) */}
          <div className="hidden md:flex justify-center items-center">
            <div className="w-96 h-96 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-600 uppercase tracking-widest">
              Mascota
            </div>
          </div>

        </div>
      </div>

      {/* SEPARADOR INCLINADO */}
      <div className="relative h-32 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-lime-500 skew-y-3 transform origin-top-left"></div>
      </div>

      {/* BLOQUE STORYTELLING */}
      <section className="bg-zinc-950 text-white py-32 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-6">
              No es turismo. <br />
              Es <span className="text-lime-400">adrenalina real.</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              Organizamos travesías off-road diseñadas para romper límites.
              Arena, barro y montaña sin filtro.
              Esto no es para mirar.
              Es para vivirlo.
            </p>
          </div>

          <div className="h-96 bg-zinc-900 rounded-3xl border border-zinc-800 flex items-center justify-center text-zinc-600">
            Video / Imagen
          </div>

        </div>
      </section>

      {/* TRAVESÍAS */}
      <section className="bg-black text-white py-32 px-8">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl font-black uppercase mb-20 text-center">
            Nuestras Travesías
          </h2>

          <div className="space-y-32">

            {/* ARENA */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="h-96 bg-[url('/arena.jpg')] bg-cover bg-center rounded-3xl"></div>
              <div>
                <h3 className="text-4xl font-black uppercase mb-6 text-lime-400">
                  Arena
                </h3>
                <p className="text-gray-400 text-lg mb-6">
                  Medanos gigantes, velocidad y control absoluto.
                  Ideal para quienes quieren sentir el poder real del cuatri.
                </p>
                <button className="border border-lime-400 text-lime-400 px-8 py-3 rounded-xl hover:bg-lime-400 hover:text-black transition">
                  Ver Detalles
                </button>
              </div>
            </div>

            {/* BARRO */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-4xl font-black uppercase mb-6 text-lime-400">
                  Barro
                </h3>
                <p className="text-gray-400 text-lg mb-6">
                  Obstáculos naturales, terrenos impredecibles y pura técnica.
                  La experiencia más intensa del off-road.
                </p>
                <button className="border border-lime-400 text-lime-400 px-8 py-3 rounded-xl hover:bg-lime-400 hover:text-black transition">
                  Ver Detalles
                </button>
              </div>
              <div className="order-1 md:order-2 h-96 bg-[url('/barro.jpg')] bg-cover bg-center rounded-3xl"></div>
            </div>

            {/* NIEVE */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="h-96 bg-[url('/nieve.jpg')] bg-cover bg-center rounded-3xl"></div>
              <div>
                <h3 className="text-4xl font-black uppercase mb-6 text-lime-400">
                  Nieve
                </h3>
                <p className="text-gray-400 text-lg mb-6">
                  Montaña, frío y desafío constante.
                  Una travesía diferente, única y brutal.
                </p>
                <button className="border border-lime-400 text-lime-400 px-8 py-3 rounded-xl hover:bg-lime-400 hover:text-black transition">
                  Ver Detalles
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ¿POR QUÉ ELEGIRNOS? */}
      <section className="bg-zinc-950 text-white py-32 px-8">

        <div className="max-w-6xl mx-auto text-center mb-20">
          <h2 className="text-5xl font-black uppercase">
            ¿Por qué andar con nosotros?
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 text-center">

          <div>
            <h3 className="text-4xl font-black text-lime-400 mb-4">+10</h3>
            <p className="text-gray-400">
              Años organizando travesías off-road.
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-lime-400 mb-4">+500</h3>
            <p className="text-gray-400">
              Participantes en experiencias extremas.
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-lime-400 mb-4">100%</h3>
            <p className="text-gray-400">
              Seguridad y coordinación profesional.
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-lime-400 mb-4">4.9★</h3>
            <p className="text-gray-400">
              Calificación promedio de nuestros miembros.
            </p>
          </div>

        </div>

      </section>

      {/* PRÓXIMAS TRAVESÍAS */}
<section className="bg-black text-white py-32 px-8">

  <div className="max-w-6xl mx-auto">

    <h2 className="text-5xl font-black uppercase text-center mb-20">
      Próximas Travesías
    </h2>

    <div className="grid md:grid-cols-2 gap-12">

      {/* EVENTO 1 */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 hover:border-lime-400 transition">

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-black text-lime-400">
            Médanos Blanco
          </h3>
          <span className="bg-lime-500 text-black px-4 py-1 rounded-full text-sm font-bold">
            Disponible
          </span>
        </div>

        <p className="text-gray-400 mb-4">
          📍 Necochea
        </p>

        <p className="text-gray-400 mb-4">
          🗓 24 Agosto 2026
        </p>

        <p className="text-gray-400 mb-6">
          Cupos limitados a 20 riders.
        </p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">
            $120 USD
          </span>

          <button className="bg-lime-500 hover:bg-lime-400 text-black font-bold px-6 py-3 rounded-xl transition">
            Reservar
          </button>
        </div>

      </div>

      {/* EVENTO 2 */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 hover:border-lime-400 transition">

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-black text-lime-400">
            Ruta del Barro
          </h3>
          <span className="bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
            Últimos Cupos
          </span>
        </div>

        <p className="text-gray-400 mb-4">
          📍 Entre Ríos
        </p>

        <p className="text-gray-400 mb-4">
          🗓 15 Septiembre 2026
        </p>

        <p className="text-gray-400 mb-6">
          Solo quedan 4 lugares disponibles.
        </p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">
            $140 USD
          </span>

          <button className="bg-lime-500 hover:bg-lime-400 text-black font-bold px-6 py-3 rounded-xl transition">
            Reservar
          </button>
        </div>

      </div>

    </div>

  </div>

</section>

      {/* CTA FINAL */}
      <section className="bg-black text-white py-32 px-6 text-center">

        <div className="max-w-4xl mx-auto">

          <h2 className="text-4xl md:text-5xl font-black uppercase mb-8">
            ¿Estás listo para ensuciarte?
          </h2>

          <p className="text-gray-400 text-lg mb-12">
            Cupos limitados por travesía. Reservá tu lugar y viví la experiencia
            más extrema del off-road.
          </p>

          <button className="bg-lime-500 hover:bg-lime-400 text-black font-bold px-10 py-5 rounded-xl transition duration-300 shadow-2xl text-lg">
            Reservar mi Travesía
          </button>

        </div>

      </section>
    </>
  )
}