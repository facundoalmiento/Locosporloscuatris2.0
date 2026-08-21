-- AlterTable: permite login con Google.
-- password pasa a ser opcional (los usuarios que entran solo con Google no tienen contraseña propia).
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;

-- googleId guarda el "sub" (id único de la cuenta de Google) del usuario, si inició sesión así.
ALTER TABLE "User" ADD COLUMN "googleId" TEXT;

CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
