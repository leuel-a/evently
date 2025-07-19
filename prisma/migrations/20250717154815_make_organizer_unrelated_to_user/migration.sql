/*
  Warnings:

  - You are about to drop the column `userId` on the `organizer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "organizer" DROP CONSTRAINT "organizer_userId_fkey";

-- DropIndex
DROP INDEX "organizer_userId_key";

-- AlterTable
ALTER TABLE "organizer" DROP COLUMN "userId";
