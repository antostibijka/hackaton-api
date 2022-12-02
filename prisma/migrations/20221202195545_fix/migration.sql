/*
  Warnings:

  - Made the column `userId` on table `userFavorites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `playerId` on table `userFavorites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "userFavorites" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "playerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL;
