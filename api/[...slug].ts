// Punto de entrada que usa Vercel. El nombre "[...slug]" hace que Vercel
// mande acá TODO lo que empiece con /api/... (auth, vehicles, categories,
// products, orders), sin necesidad de una función por ruta.
import app from "../server/app";

export default app;
