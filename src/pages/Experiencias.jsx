export default function Experiencias() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white pt-32 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl md:text-6xl font-black uppercase mb-16 text-center tracking-widest">
          Travesías <span className="text-lime-400"></span>
        </h1>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="group relative overflow-hidden rounded-2xl h-96 cursor-pointer transform transition duration-500 hover:-translate-y-3">

            <div className="absolute inset-0 bg-[url('/arena.jpg')] bg-cover bg-center group-hover:scale-110 transition duration-700"></div>

            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition"></div>

            <div className="relative z-10 h-full flex items-end p-8">
              <h3 className="text-3xl font-black uppercase">
                Arena
              </h3>
            </div>

          </div>

          <div className="group relative overflow-hidden rounded-2xl h-96 cursor-pointer transform transition duration-500 hover:-translate-y-3">

            <div className="absolute inset-0 bg-[url('/barro.jpg')] bg-cover bg-center group-hover:scale-110 transition duration-700"></div>

            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition"></div>

            <div className="relative z-10 h-full flex items-end p-8">
              <h3 className="text-3xl font-black uppercase">
                Barro
              </h3>
            </div>

          </div>

          <div className="group relative overflow-hidden rounded-2xl h-96 cursor-pointer transform transition duration-500 hover:-translate-y-3">

            <div className="absolute inset-0 bg-[url('/nieve.jpg')] bg-cover bg-center group-hover:scale-110 transition duration-700"></div>

            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition"></div>

            <div className="relative z-10 h-full flex items-end p-8">
              <h3 className="text-3xl font-black uppercase">
                Nieve
              </h3>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}