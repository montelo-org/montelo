/*
  Warnings:

  - Added the required column `type` to the `log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "log" ADD COLUMN     "type" TEXT NOT NULL;
