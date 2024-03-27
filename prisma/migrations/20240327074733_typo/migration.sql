/*
  Warnings:

  - You are about to drop the column `updateAr` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `updateAr` on the `List` table. All the data in the column will be lost.
  - Added the required column `updateAt` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "updateAr",
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "List" DROP COLUMN "updateAr",
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;
