import Navbar from "./components/Navbar"

export default function App() {
  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div className="relative h-screen w-full overflow-hidden">

        {/* VIDEO BACKGROUND */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video2.mp4" type="video/mp4" />
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-wide mb-6">
            Locos por los Cuatris
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-gray-200 mb-8">
            Travesías extremas en arena, barro y montaña.
            Viví la experiencia real.
          </p>

          <button className="bg-lime-500 hover:bg-lime-400 text-black font-bold px-8 py-4 rounded-xl transition duration-300 shadow-xl">
            Reservar Ahora
          </button>

        </div>
      </div>
    </>
  )
}