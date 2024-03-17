/*
  Warnings:

  - Made the column `name` on table `experiment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "experiment" ALTER COLUMN "name" SET NOT NULL;
