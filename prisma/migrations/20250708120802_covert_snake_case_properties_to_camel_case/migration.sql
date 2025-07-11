/*
  Warnings:

  - You are about to drop the column `cover_image_url` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `is_published` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `EventsCategory` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `EventsCategory` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Organizer` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Organizer` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `EventsCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Organizer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Organizer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "cover_image_url",
DROP COLUMN "created_at",
DROP COLUMN "end_time",
DROP COLUMN "is_published",
DROP COLUMN "start_time",
DROP COLUMN "updated_at",
ADD COLUMN     "coverImageUrl" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "EventsCategory" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Organizer" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "created_at",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
