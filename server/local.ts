import "dotenv/config";
import app from "./app";

// Solo para desarrollo local: levanta un servidor de verdad con app.listen().
// En Vercel esto no se usa — ahí corre api/[...slug].ts en su lugar.
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

app.listen(PORT, () => {
  console.log(`Servidor local corriendo en http://localhost:${PORT}`);
});
