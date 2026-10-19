export const travesias = [
  {
    id: "cordoba-sanluis-2026",
    tipo: "sierra",
    titulo: "Cordoba - San Luis 2026",
    fecha: "Mayo 2026",
    fechaOrden: "2026-05-01",
    portada: "/galeria/cordoba-sanluis-2026/01.webp",
    fotos: Array.from(
      { length: 11 },
      (_, index) => `/galeria/cordoba-sanluis-2026/${String(index + 1).padStart(2, "0")}.webp`
    )
  },
  {
    id: "pinamar-2026",
    tipo: "arena",
    titulo: "Pinamar Agosto",
    fecha: "Agosto 2026",
    fechaOrden: "2026-08-01",
    portada: "/galeria/pinamar-2026/01.webp",
    fotos: Array.from(
      { length: 7 },
      (_, index) => `/galeria/pinamar-2026/${String(index + 1).padStart(2, "0")}.webp`
    )
  },
  {
    id: "san-cayetano-2026",
    tipo: "arena",
    titulo: "San Cayetano",
    fecha: "Marzo 2026",
    // fechaOrden: fecha real (ISO) para poder ordenar el Pasaporte Off-Road
    // cronológicamente — no se muestra tal cual, es solo para ordenar.
    fechaOrden: "2026-03-01",
    portada: "/galeria/san-cayetano-2026/01.webp",
    fotos: Array.from(
      { length: 10 },
      (_, index) => `/galeria/san-cayetano-2026/${String(index + 1).padStart(2, "0")}.webp`
    )
  },
  {
    id: "nocturna-3-2017",
    tipo: "barro",
    titulo: "No le temas a la oscuridad 3",
    fecha: "Noviembre 2017",
    fechaOrden: "2017-11-01",
    portada: "/galeria/nocturna-3-2017/01.webp",
    fotos: Array.from(
      { length: 10 },
      (_, index) => `/galeria/nocturna-3-2017/${String(index + 1).padStart(2, "0")}.webp`
    )
  },
  {
    id: "bomberos-el-peligro-2024",
    tipo: "solidaria",
    titulo: "Día del Niño — Bomberos El Peligro",
    fecha: "24 de agosto de 2024",
    fechaOrden: "2024-08-24",
    portada: "/galeria/bomberos-el-peligro-2024/01.webp",
    fotos: Array.from(
      { length: 10 },
      (_, index) => `/galeria/bomberos-el-peligro-2024/${String(index + 1).padStart(2, "0")}.webp`
    )
  }
]
