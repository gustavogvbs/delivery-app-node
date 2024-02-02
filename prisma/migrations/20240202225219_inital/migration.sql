/*
  Warnings:

  - A unique constraint covering the columns `[tenantId]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoryId]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "tenantId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_tenantId_key" ON "products"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "products_categoryId_key" ON "products"("categoryId");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categorys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
