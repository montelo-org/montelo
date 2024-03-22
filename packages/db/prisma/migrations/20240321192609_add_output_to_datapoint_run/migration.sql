/*
  Warnings:

  - You are about to drop the column `output` on the `datapoint` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "datapoint" DROP COLUMN "output",
ADD COLUMN     "expectedOutput" JSONB;

-- AlterTable
ALTER TABLE "datapoint_run" ADD COLUMN     "output" JSONB;
