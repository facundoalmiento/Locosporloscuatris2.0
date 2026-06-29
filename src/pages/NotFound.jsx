import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <main className="page-shell">
      <div className="page-container">
        <section className="hero-stage">
          <div className="hero-panel">
            <div>
              <p className="hero-eyebrow">Error 404</p>
              <h1 className="hero-title">Este camino no forma parte de la travesía.</h1>
              <p className="hero-copy">La página que buscás no existe o cambió de dirección.</p>
              <div className="action-row">
                <Link to="/" className="primary-action">Volver al inicio</Link>
                <Link to="/galeria" className="secondary-action">Ver la galería</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
