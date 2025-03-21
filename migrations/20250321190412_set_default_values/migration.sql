/*
  Warnings:

  - You are about to drop the column `isEnabledBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isEnabledDate` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isEnabledBy",
DROP COLUMN "isEnabledDate",
ADD COLUMN     "disabledAt" TIMESTAMP(3),
ADD COLUMN     "disabledBy" TEXT,
ADD COLUMN     "enabledAt" TIMESTAMP(3),
ADD COLUMN     "enabledBy" TEXT,
ALTER COLUMN "isEnabled" SET DEFAULT true;
