/*
  Warnings:

  - You are about to drop the column `OrganizationName` on the `organizer` table. All the data in the column will be lost.
  - Added the required column `organizationName` to the `organizer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizer" DROP COLUMN "OrganizationName",
ADD COLUMN     "organizationName" TEXT NOT NULL;
