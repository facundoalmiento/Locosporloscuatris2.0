-- Simplifica MaintenanceType de 4 valores a 2: ACEITE y GENERAL.
-- Los registros que eran CORREA, ENGRASE u OTRO pasan a ser GENERAL
-- (no se pierden, solo cambian de categoría).

ALTER TYPE "MaintenanceType" RENAME TO "MaintenanceType_old";

CREATE TYPE "MaintenanceType" AS ENUM ('ACEITE', 'GENERAL');

ALTER TABLE "MaintenanceLog"
  ALTER COLUMN "type" TYPE "MaintenanceType"
  USING (
    CASE "type"::text
      WHEN 'ACEITE' THEN 'ACEITE'
      ELSE 'GENERAL'
    END
  )::"MaintenanceType";

DROP TYPE "MaintenanceType_old";
