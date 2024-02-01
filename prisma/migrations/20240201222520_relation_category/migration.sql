/*
  Warnings:

  - A unique constraint covering the columns `[tenantId]` on the table `categorys` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tenantId` to the `categorys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categorys" ADD COLUMN     "tenantId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categorys_tenantId_key" ON "categorys"("tenantId");

-- AddForeignKey
ALTER TABLE "categorys" ADD CONSTRAINT "categorys_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
