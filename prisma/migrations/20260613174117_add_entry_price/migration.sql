/*
  Warnings:

  - You are about to drop the column `Priceperday` on the `Place` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Place" DROP COLUMN "Priceperday",
ADD COLUMN     "entryPrice" INTEGER;
