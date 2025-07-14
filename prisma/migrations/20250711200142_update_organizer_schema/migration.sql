/*
  Warnings:

  - Added the required column `OrganizationName` to the `organizer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizer" ADD COLUMN     "OrganizationName" TEXT NOT NULL;
