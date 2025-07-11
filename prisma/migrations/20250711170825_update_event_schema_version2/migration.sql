/*
  Warnings:

  - You are about to drop the column `category` on the `events` table. All the data in the column will be lost.
  - The primary key for the `events_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `categoryId` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "events_category" DROP CONSTRAINT "events_category_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "events_category_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "events_category_id_seq";

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "events_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
