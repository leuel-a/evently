/*
  Warnings:

  - You are about to drop the column `isOrganizer` on the `user` table. All the data in the column will be lost.
  - Added the required column `date` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "isOrganizer";
