/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `publications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `publications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "publications" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "publications_title_key" ON "publications"("title");
