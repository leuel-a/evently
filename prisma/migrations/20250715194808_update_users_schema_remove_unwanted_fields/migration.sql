/*
  Warnings:

  - You are about to drop the column `firstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_email_phone_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phone";

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
