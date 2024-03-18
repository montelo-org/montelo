-- DropForeignKey
ALTER TABLE "datapoint" DROP CONSTRAINT "datapoint_dataset_id_fkey";

-- AddForeignKey
ALTER TABLE "datapoint" ADD CONSTRAINT "datapoint_dataset_id_fkey" FOREIGN KEY ("dataset_id") REFERENCES "dataset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
