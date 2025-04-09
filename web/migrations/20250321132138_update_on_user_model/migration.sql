/*
  Warnings:

  - Added the required column `isEnabled` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isEnabled" BOOLEAN NOT NULL,
ADD COLUMN     "isEnabledBy" TEXT,
ADD COLUMN     "isEnabledDate" TIMESTAMP(3);
