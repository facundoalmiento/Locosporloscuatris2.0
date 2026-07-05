export const travesias = [
  {
    id: "san-cayetano-2025",
    tipo: "arena",
    titulo: "San Cayetano",
    fecha: "Noviembre 2025",
    portada: "/galeria/san-cayetano-2025/01.webp",
    fotos: Array.from(
      { length: 10 },
      (_, index) => `/galeria/san-cayetano-2025/${String(index + 1).padStart(2, "0")}.webp`
    )
  },
  {
    id: "pinamar-primavera-2025",
    tipo: "arena",
    titulo: "Pinamar Primavera",
    fecha: "Septiembre 2025",
    portada: "/galeria/pinamar-primavera-2025/01.webp",
    fotos: Array.from(
      { length: 10 },
      (_, index) => `/galeria/pinamar-primavera-2025/${String(index + 1).padStart(2, "0")}.webp`
    )
  },
  {
    id: "nocturna-3-2017",
    tipo: "barro",
    titulo: "No le temas a la oscuridad 3",
    fecha: "Noviembre 2017",
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
    portada: "/galeria/bomberos-el-peligro-2024/01.webp",
    fotos: Array.from(
      { length: 10 },
      (_, index) => `/galeria/bomberos-el-peligro-2024/${String(index + 1).padStart(2, "0")}.webp`
    )
  }
]
