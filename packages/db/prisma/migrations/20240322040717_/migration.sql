/*
  Warnings:

  - You are about to drop the column `datapointRunId` on the `trace` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[datapoint_run_id]` on the table `trace` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "trace" DROP CONSTRAINT "trace_datapointRunId_fkey";

-- DropIndex
DROP INDEX "trace_datapointRunId_key";

-- AlterTable
ALTER TABLE "trace" DROP COLUMN "datapointRunId",
ADD COLUMN     "datapoint_run_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "trace_datapoint_run_id_key" ON "trace"("datapoint_run_id");

-- AddForeignKey
ALTER TABLE "trace" ADD CONSTRAINT "trace_datapoint_run_id_fkey" FOREIGN KEY ("datapoint_run_id") REFERENCES "datapoint_run"("id") ON DELETE CASCADE ON UPDATE CASCADE;
