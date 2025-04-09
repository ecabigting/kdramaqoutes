/*
  Warnings:

  - Added the required column `characterName` to the `Qoutes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showTitle` to the `Qoutes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Qoutes" ADD COLUMN     "characterName" TEXT NOT NULL,
ADD COLUMN     "showTitle" TEXT NOT NULL;
