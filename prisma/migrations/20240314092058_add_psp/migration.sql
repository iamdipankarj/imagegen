/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rzpPaymentId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paddlePaymentId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rzpCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paddleCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "paddlePaymentId" TEXT,
ADD COLUMN     "rzpPaymentId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ADD COLUMN     "paddleCustomerId" TEXT,
ADD COLUMN     "rzpCustomerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_rzpPaymentId_key" ON "Purchase"("rzpPaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_paddlePaymentId_key" ON "Purchase"("paddlePaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "User_rzpCustomerId_key" ON "User"("rzpCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_paddleCustomerId_key" ON "User"("paddleCustomerId");
