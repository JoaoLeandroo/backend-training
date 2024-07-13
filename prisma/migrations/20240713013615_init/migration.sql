/*
  Warnings:

  - The primary key for the `training` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `training` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `location` column on the `training` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "training" DROP CONSTRAINT "training_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "location",
ADD COLUMN     "location" TEXT[],
ADD CONSTRAINT "training_pkey" PRIMARY KEY ("id");
