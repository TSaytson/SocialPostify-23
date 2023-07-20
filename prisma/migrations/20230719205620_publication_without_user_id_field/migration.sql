/*
  Warnings:

  - You are about to drop the column `userId` on the `publications` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_userId_fkey";

-- AlterTable
ALTER TABLE "publications" DROP COLUMN "userId",
ALTER COLUMN "dateToPublish" SET DATA TYPE DATE;
