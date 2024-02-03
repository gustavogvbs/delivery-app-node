/*
  Warnings:

  - You are about to drop the column `Description` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `Slug` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dame` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "products_Slug_key";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "Description",
DROP COLUMN "Name",
DROP COLUMN "Slug",
ADD COLUMN     "dame" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
