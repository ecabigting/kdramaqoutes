/*
  Warnings:

  - Added the required column `userId` to the `Qoutes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Qoutes" ADD COLUMN     "authorName" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Qoutes" ADD CONSTRAINT "Qoutes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
