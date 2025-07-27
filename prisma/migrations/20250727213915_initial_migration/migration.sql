-- AlterTable
ALTER TABLE "events" ADD COLUMN     "isVirtual" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isOrganizer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "organizationName" TEXT;
