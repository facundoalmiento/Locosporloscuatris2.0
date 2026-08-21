-- Guarda la "firma" del último recordatorio de mantenimiento mandado por
-- email a cada usuario, para no repetirlo todos los días sin necesidad.
ALTER TABLE "User" ADD COLUMN "lastReminderSignature" TEXT;
