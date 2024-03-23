/*
  Warnings:

  - You are about to drop the column `output` on the `datapoint` table. All the data in the column will be lost.
  - You are about to drop the `experiment_run` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[datapoint_run_id]` on the table `trace` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "experiment_run" DROP CONSTRAINT "experiment_run_experiment_id_fkey";

-- AlterTable
ALTER TABLE "datapoint" DROP COLUMN "output",
ADD COLUMN     "expectedOutput" JSONB;

-- AlterTable
ALTER TABLE "trace" ADD COLUMN     "datapoint_run_id" TEXT;

-- DropTable
DROP TABLE "experiment_run";

-- CreateTable
CREATE TABLE "datapoint_run" (
    "id" TEXT NOT NULL,
    "output" JSONB,
    "experiment_id" TEXT NOT NULL,
    "datapoint_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "datapoint_run_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trace_datapoint_run_id_key" ON "trace"("datapoint_run_id");

-- AddForeignKey
ALTER TABLE "trace" ADD CONSTRAINT "trace_datapoint_run_id_fkey" FOREIGN KEY ("datapoint_run_id") REFERENCES "datapoint_run"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datapoint_run" ADD CONSTRAINT "datapoint_run_experiment_id_fkey" FOREIGN KEY ("experiment_id") REFERENCES "experiment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datapoint_run" ADD CONSTRAINT "datapoint_run_datapoint_id_fkey" FOREIGN KEY ("datapoint_id") REFERENCES "datapoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
