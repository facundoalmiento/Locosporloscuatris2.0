-- CreateTable: Pasaporte Off-Road — qué travesías asistió cada usuario.
CREATE TABLE "TravesiaAsistencia" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "travesiaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TravesiaAsistencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TravesiaAsistencia_userId_idx" ON "TravesiaAsistencia"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TravesiaAsistencia_userId_travesiaId_key" ON "TravesiaAsistencia"("userId", "travesiaId");

-- AddForeignKey
ALTER TABLE "TravesiaAsistencia" ADD CONSTRAINT "TravesiaAsistencia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
