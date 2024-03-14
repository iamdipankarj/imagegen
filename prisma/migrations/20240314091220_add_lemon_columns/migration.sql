/*
  Warnings:

  - You are about to drop the column `lsqCustomerId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lemonPaymentId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lemonCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_lsqCustomerId_key";

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "lemonPaymentId" TEXT,
ALTER COLUMN "stripePaymentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lsqCustomerId",
ADD COLUMN     "lemonCustomerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_lemonPaymentId_key" ON "Purchase"("lemonPaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "User_lemonCustomerId_key" ON "User"("lemonCustomerId");
