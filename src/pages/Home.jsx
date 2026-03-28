import { Link } from "react-router-dom"

export default function Home() {
  return (
    <>

      {/* HERO */}
      <div className="relative h-screen w-full bg-black flex items-center">

        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center w-full">

          {/* TEXTO */}
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

              <Link
                to="/travesias"
                className="bg-lime-500 hover:bg-lime-400 text-black font-bold px-10 py-5 rounded-xl transition duration-300 shadow-xl"
              >
                Reservar Ahora
              </Link>

              <Link
                to="/galeria"
                className="border border-gray-600 hover:border-lime-400 px-10 py-5 rounded-xl transition duration-300"
              >
                Ver Aventuras
              </Link>

            </div>

          </div>


          {/* MASCOTA */}
          <div className="hidden md:flex justify-center items-center">

            <img
              src="/galeria/rata.png"
              alt="Mascota Locos por los Cuatris"
              className="w-80 object-contain hover:scale-105 transition duration-500"
            />

          </div>

        </div>

      </div>


      {/* SEPARADOR */}
      <div className="relative h-32 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-lime-500 skew-y-3 transform origin-top-left"></div>
      </div>


      {/* STORYTELLING */}
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

          <div className="h-96 rounded-3xl overflow-hidden border border-zinc-800">

            <img
              src="/galeria/pinamar-2025/enduro.jpg"
              className="w-full h-full object-cover"
              alt="Travesía Off Road"
            />

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

              <div className="h-96 rounded-3xl overflow-hidden">

                <img
                  src="/galeria/pinamar-2025/picante.jpg"
                  className="w-full h-full object-cover"
                  alt="Travesía en arena"
                />

              </div>

              <div>

                <h3 className="text-4xl font-black uppercase mb-6 text-lime-400">
                  Arena
                </h3>

                <p className="text-gray-400 text-lg mb-6">
                  Médanos gigantes, velocidad y control absoluto.
                  Ideal para quienes quieren sentir el poder real del cuatri.
                </p>

                <div className="flex gap-4">

                  <Link
                    to="/galeria"
                    className="border border-lime-400 text-lime-400 px-8 py-3 rounded-xl hover:bg-lime-400 hover:text-black transition"
                  >
                    Ver Aventuras
                  </Link>

                  <Link
                    to="/travesias"
                    className="bg-lime-500 text-black px-8 py-3 rounded-xl font-semibold hover:bg-lime-400 transition"
                  >
                    Reservar
                  </Link>

                </div>

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

                <div className="flex gap-4">

                  <Link
                    to="/galeria"
                    className="border border-lime-400 text-lime-400 px-8 py-3 rounded-xl hover:bg-lime-400 hover:text-black transition"
                  >
                    Ver Aventuras
                  </Link>

                  <Link
                    to="/travesias"
                    className="bg-lime-500 text-black px-8 py-3 rounded-xl font-semibold hover:bg-lime-400 transition"
                  >
                    Reservar
                  </Link>

                </div>

              </div>

              <div className="order-1 md:order-2 h-96 rounded-3xl overflow-hidden">

                <img
                  src="/galeria/barrofuerte.jpg"
                  className="w-full h-full object-cover"
                  alt="Travesía barro"
                />

              </div>

            </div>


            {/* NIEVE */}
            <div className="grid md:grid-cols-2 gap-16 items-center">

              <div className="h-96 rounded-3xl overflow-hidden">

                <img
                  src="/galeria/nieve/nieve-06.jpg"
                  className="w-full h-full object-cover"
                  alt="Travesía nieve"
                />

              </div>

              <div>

                <h3 className="text-4xl font-black uppercase mb-6 text-lime-400">
                  Nieve
                </h3>

                <p className="text-gray-400 text-lg mb-6">
                  Montaña, frío y desafío constante.
                  Una travesía diferente, única y brutal.
                </p>

                <div className="flex gap-4">

                  <Link
                    to="/galeria"
                    className="border border-lime-400 text-lime-400 px-8 py-3 rounded-xl hover:bg-lime-400 hover:text-black transition"
                  >
                    Ver Aventuras
                  </Link>

                  <Link
                    to="/travesias"
                    className="bg-lime-500 text-black px-8 py-3 rounded-xl font-semibold hover:bg-lime-400 transition"
                  >
                    Reservar
                  </Link>

                </div>

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

          <Link
            to="/travesias"
            className="bg-lime-500 hover:bg-lime-400 text-black font-bold px-10 py-5 rounded-xl transition duration-300 shadow-2xl text-lg inline-block"
          >
            Reservar mi Travesía
          </Link>

        </div>

      </section>

    </>
  )
}