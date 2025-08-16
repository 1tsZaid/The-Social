/*
  Warnings:

  - You are about to drop the column `locationLat` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the column `locationLng` on the `Community` table. All the data in the column will be lost.
  - Added the required column `location` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Community_locationLat_locationLng_idx";

-- AlterTable
ALTER TABLE "Community" DROP COLUMN "locationLat",
DROP COLUMN "locationLng",
ADD COLUMN     "location" geometry(Point, 4326) NOT NULL;

-- CreateIndex
CREATE INDEX "Community_location_idx" ON "Community" USING GIST ("location");
