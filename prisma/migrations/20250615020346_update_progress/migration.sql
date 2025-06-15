/*
  Warnings:

  - You are about to drop the column `date` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `nextAction` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Progress` table. All the data in the column will be lost.
  - Added the required column `task` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "date",
DROP COLUMN "nextAction",
DROP COLUMN "status",
ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "task" TEXT NOT NULL;
