-- AddForeignKey
ALTER TABLE "experiment" ADD CONSTRAINT "experiment_dataset_id_fkey" FOREIGN KEY ("dataset_id") REFERENCES "dataset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
