/*
  Warnings:

  - You are about to drop the `experiment_run` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[datapointRunId]` on the table `trace` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "experiment_run" DROP CONSTRAINT "experiment_run_experiment_id_fkey";

-- AlterTable
ALTER TABLE "trace" ADD COLUMN     "datapointRunId" TEXT;

-- DropTable
DROP TABLE "experiment_run";

-- CreateTable
CREATE TABLE "datapoint_run" (
    "id" TEXT NOT NULL,
    "experiment_id" TEXT NOT NULL,
    "datapoint_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "datapoint_run_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trace_datapointRunId_key" ON "trace"("datapointRunId");

-- AddForeignKey
ALTER TABLE "trace" ADD CONSTRAINT "trace_datapointRunId_fkey" FOREIGN KEY ("datapointRunId") REFERENCES "datapoint_run"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datapoint_run" ADD CONSTRAINT "datapoint_run_experiment_id_fkey" FOREIGN KEY ("experiment_id") REFERENCES "experiment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datapoint_run" ADD CONSTRAINT "datapoint_run_datapoint_id_fkey" FOREIGN KEY ("datapoint_id") REFERENCES "datapoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
