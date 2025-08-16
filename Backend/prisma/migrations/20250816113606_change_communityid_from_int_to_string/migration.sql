/*
  Warnings:

  - The primary key for the `Community` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_UserCommunities" DROP CONSTRAINT "_UserCommunities_A_fkey";

-- AlterTable
ALTER TABLE "Community" DROP CONSTRAINT "Community_pkey",
ALTER COLUMN "communityId" DROP DEFAULT,
ALTER COLUMN "communityId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Community_pkey" PRIMARY KEY ("communityId");
DROP SEQUENCE "Community_communityId_seq";

-- AlterTable
ALTER TABLE "_UserCommunities" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_UserCommunities" ADD CONSTRAINT "_UserCommunities_A_fkey" FOREIGN KEY ("A") REFERENCES "Community"("communityId") ON DELETE CASCADE ON UPDATE CASCADE;
