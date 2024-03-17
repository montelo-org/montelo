/*
  Warnings:

  - Made the column `api_name` on table `dataset` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "dataset" ALTER COLUMN "api_name" SET NOT NULL;
