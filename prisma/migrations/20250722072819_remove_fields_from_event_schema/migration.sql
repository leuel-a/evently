/*
  Warnings:

  - You are about to drop the column `isPublished` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `organizerId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the `organizer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_organizerId_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "isPublished",
DROP COLUMN "organizerId";

-- DropTable
DROP TABLE "organizer";
