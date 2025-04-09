-- DropForeignKey
ALTER TABLE "Qoutes" DROP CONSTRAINT "Qoutes_userId_fkey";

-- AlterTable
ALTER TABLE "Qoutes" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Qoutes" ADD CONSTRAINT "Qoutes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
