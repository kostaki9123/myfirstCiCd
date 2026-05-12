/*
  Warnings:

  - The `Placewith` column on the `PlaceAffiliateLink` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `placetype` column on the `PlaceAffiliateLink` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PlaceAffiliateLink" DROP COLUMN "Placewith",
ADD COLUMN     "Placewith" TEXT[],
DROP COLUMN "placetype",
ADD COLUMN     "placetype" TEXT[];
