/*
  Warnings:

  - You are about to drop the column `logoUrl` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "logoUrl";

-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "Progress" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "nextAction" TEXT,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Progress_companyId_idx" ON "Progress"("companyId");

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
