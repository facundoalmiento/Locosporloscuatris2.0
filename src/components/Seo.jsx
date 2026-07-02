import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import { siteConfig } from "../config/site"
import { travesias } from "../data/travesias"

const paginas = {
  "/": {
    titulo: "Locos por los Cuatris | Travesías en cuatriciclo",
    descripcion: "Travesías en cuatriciclo, ATV y UTV por médanos, barro y caminos de Argentina. Conocé las próximas salidas de Locos por los Cuatris.",
  },
  "/travesias": {
    titulo: "Locos por los Cuatris | Travesías off-road en Argentina",
    descripcion: "Descubrí nuestras travesías de arena, barro, nieve y salidas solidarias en cuatriciclo, ATV y UTV por Argentina.",
  },
  "/galeria": {
    titulo: "Locos por los Cuatris | Galería de travesías off-road",
    descripcion: "Fotos de travesías en cuatriciclo por médanos, playas, barro y caminos de Argentina. Reviví cada aventura con el grupo.",
  },
  "/historia": {
    titulo: "Locos por los Cuatris | Nuestra Historia",
    descripcion: "Conocé cómo nació Locos por los Cuatris, sus primeros pasos y el camino recorrido por el grupo.",
    indexable: siteConfig.mostrarHistoria,
  },
  "/sponsors": {
    titulo: "Locos por los Cuatris | Sponsors y aliados",
    descripcion: "Conocé las marcas y organizaciones que acompañan las travesías y acciones solidarias de Locos por los Cuatris.",
  },
  "/contacto": {
    titulo: "Locos por los Cuatris | Contacto y próximas salidas",
    descripcion: "Consultá fechas, cupos y requisitos para sumarte a las próximas travesías en cuatriciclo de Locos por los Cuatris.",
  },
  "/tienda": {
    titulo: "Locos por los Cuatris | Equipamiento off-road",
    descripcion: "Equipamiento y accesorios para cuatriciclos, ATV y UTV pensados para travesías off-road exigentes.",
  },
}

const normalizarRuta = (pathname) => pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname

function actualizarMeta(selector, atributo, valor) {
  let elemento = document.head.querySelector(selector)

  if (!elemento) {
    elemento = document.createElement("meta")
    const coincidencia = selector.match(/\[(name|property)="([^"]+)"\]/)
    if (coincidencia) elemento.setAttribute(coincidencia[1], coincidencia[2])
    document.head.appendChild(elemento)
  }

  elemento.setAttribute(atributo, valor)
}

function obtenerSeo(pathname) {
  const pagina = paginas[pathname]
  if (pagina) return { ...pagina, indexable: pagina.indexable ?? true }

  if (pathname.startsWith("/galeria/")) {
    const id = decodeURIComponent(pathname.slice("/galeria/".length))
    const travesia = travesias.find((item) => item.id === id)

    if (travesia) {
      return {
        titulo: `Locos por los Cuatris | ${travesia.titulo}`,
        descripcion: `Fotos de ${travesia.titulo}, ${travesia.fecha}. Recorré el álbum de esta travesía off-road de Locos por los Cuatris.`,
        imagen: travesia.portada,
        indexable: true,
      }
    }
  }

  return {
    titulo: "Locos por los Cuatris | Página no encontrada",
    descripcion: siteConfig.descripcion,
    indexable: false,
  }
}

export default function Seo() {
  const location = useLocation()

  useEffect(() => {
    const pathname = normalizarRuta(location.pathname)
    const seo = obtenerSeo(pathname)
    const canonicalUrl = `${siteConfig.sitioUrl}${pathname === "/" ? "/" : pathname}`
    const imagenUrl = new URL(seo.imagen ?? siteConfig.imagenSocial, siteConfig.sitioUrl).href
    const robots = seo.indexable ? "index, follow, max-image-preview:large" : "noindex, nofollow"

    document.title = seo.titulo
    document.documentElement.lang = "es-AR"

    actualizarMeta('meta[name="description"]', "content", seo.descripcion)
    actualizarMeta('meta[name="robots"]', "content", robots)
    actualizarMeta('meta[property="og:title"]', "content", seo.titulo)
    actualizarMeta('meta[property="og:description"]', "content", seo.descripcion)
    actualizarMeta('meta[property="og:url"]', "content", canonicalUrl)
    actualizarMeta('meta[property="og:image"]', "content", imagenUrl)
    actualizarMeta('meta[property="og:image:alt"]', "content", seo.titulo)
    actualizarMeta('meta[name="twitter:title"]', "content", seo.titulo)
    actualizarMeta('meta[name="twitter:description"]', "content", seo.descripcion)
    actualizarMeta('meta[name="twitter:image"]', "content", imagenUrl)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.rel = "canonical"
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    const datosEstructurados = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${siteConfig.sitioUrl}/#organization`,
          name: siteConfig.nombre,
          url: `${siteConfig.sitioUrl}/`,
          logo: new URL(siteConfig.imagenSocial, siteConfig.sitioUrl).href,
          image: new URL(siteConfig.imagenSocial, siteConfig.sitioUrl).href,
          sameAs: [siteConfig.instagramUrl],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: `+${siteConfig.whatsappNumero}`,
            availableLanguage: "Spanish",
          },
        },
        {
          "@type": "WebSite",
          "@id": `${siteConfig.sitioUrl}/#website`,
          url: `${siteConfig.sitioUrl}/`,
          name: siteConfig.nombre,
          inLanguage: "es-AR",
          publisher: { "@id": `${siteConfig.sitioUrl}/#organization` },
        },
        {
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: seo.titulo,
          description: seo.descripcion,
          inLanguage: "es-AR",
          isPartOf: { "@id": `${siteConfig.sitioUrl}/#website` },
          about: { "@id": `${siteConfig.sitioUrl}/#organization` },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: imagenUrl,
          },
        },
      ],
    }

    let schema = document.head.querySelector("#seo-structured-data")
    if (!schema) {
      schema = document.createElement("script")
      schema.id = "seo-structured-data"
      schema.type = "application/ld+json"
      document.head.appendChild(schema)
    }
    schema.textContent = JSON.stringify(datosEstructurados)
  }, [location.pathname])

  return null
}
