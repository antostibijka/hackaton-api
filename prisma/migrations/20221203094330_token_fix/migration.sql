/*
  Warnings:

  - The `userId` column on the `userToken` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "userToken" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER;
