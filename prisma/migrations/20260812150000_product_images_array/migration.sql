-- AlterTable: reemplaza imageUrl (una sola foto) por images (varias fotos, ordenadas)
ALTER TABLE "Product" ADD COLUMN "images" TEXT[] NOT NULL DEFAULT '{}';

-- Migra los datos existentes: la foto que ya tenía cargada pasa a ser la primera del array.
UPDATE "Product" SET "images" = ARRAY["imageUrl"] WHERE "imageUrl" IS NOT NULL;

ALTER TABLE "Product" DROP COLUMN "imageUrl";
