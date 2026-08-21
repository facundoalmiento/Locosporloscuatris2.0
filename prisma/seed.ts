// Carga categorías y productos de ejemplo (los mismos de src/data/productos.js,
// pero como filas reales en Postgres). Se puede correr varias veces sin duplicar.
import "dotenv/config";
import { prisma } from "../server/config/prisma";

const categorias = ["Cascos", "Guantes", "Aceites", "Protecciones"];

const productos = [
  {
    name: "Casco Cross Pro",
    description: "Protección extrema para travesías off-road.",
    price: 180,
    stock: 8,
    categoria: "Cascos",
  },
  {
    name: "Guantes Enduro",
    description: "Máximo agarre en barro y arena incluso con terreno pesado.",
    price: 35,
    stock: 20,
    categoria: "Guantes",
  },
  {
    name: "Aceite Motul 7100",
    description: "Rendimiento estable para motores exigidos en travesías largas.",
    price: 22,
    stock: 30,
    categoria: "Aceites",
  },
  {
    name: "Pechera Pro Rider",
    description: "Protección de torso para salidas intensas y conducción agresiva.",
    price: 95,
    stock: 10,
    categoria: "Protecciones",
  },
  {
    name: "Rodilleras Pro",
    description: "Cobertura firme y cómoda para motocross, enduro y cuatri.",
    price: 70,
    stock: 15,
    categoria: "Protecciones",
  },
];

async function main() {
  for (const nombre of categorias) {
    await prisma.category.upsert({
      where: { name: nombre },
      update: {},
      create: { name: nombre },
    });
  }

  for (const producto of productos) {
    const category = await prisma.category.findUnique({ where: { name: producto.categoria } });
    if (!category) continue;

    const existing = await prisma.product.findFirst({ where: { name: producto.name } });
    if (existing) {
      console.log(`Ya existe "${producto.name}", lo salteo`);
      continue;
    }

    await prisma.product.create({
      data: {
        name: producto.name,
        description: producto.description,
        price: producto.price,
        stock: producto.stock,
        categoryId: category.id,
      },
    });
    console.log(`Creado: ${producto.name}`);
  }

  console.log("Seed listo.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
