/*
  Warnings:

  - You are about to drop the `Feature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CityToFeature` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CityToFeature" DROP CONSTRAINT "_CityToFeature_A_fkey";

-- DropForeignKey
ALTER TABLE "_CityToFeature" DROP CONSTRAINT "_CityToFeature_B_fkey";

-- DropTable
DROP TABLE "Feature";

-- DropTable
DROP TABLE "_CityToFeature";

-- CreateTable
CREATE TABLE "CityFeature" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CityFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CityToCityFeature" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CityFeature_name_key" ON "CityFeature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CityToCityFeature_AB_unique" ON "_CityToCityFeature"("A", "B");

-- CreateIndex
CREATE INDEX "_CityToCityFeature_B_index" ON "_CityToCityFeature"("B");

-- AddForeignKey
ALTER TABLE "_CityToCityFeature" ADD CONSTRAINT "_CityToCityFeature_A_fkey" FOREIGN KEY ("A") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CityToCityFeature" ADD CONSTRAINT "_CityToCityFeature_B_fkey" FOREIGN KEY ("B") REFERENCES "CityFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;
