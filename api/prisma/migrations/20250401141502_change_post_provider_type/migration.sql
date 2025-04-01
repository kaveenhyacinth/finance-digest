/*
  Warnings:

  - The `provider` column on the `posts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "provider";
ALTER TABLE "posts" ADD COLUMN     "provider" STRING NOT NULL DEFAULT 'blott';

-- DropEnum
DROP TYPE "POST_PROVIDER";
