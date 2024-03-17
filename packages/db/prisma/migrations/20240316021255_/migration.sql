/*
  Warnings:

  - A unique constraint covering the columns `[api_name,env_id]` on the table `dataset` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "dataset_name_env_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "dataset_api_name_env_id_key" ON "dataset"("api_name", "env_id");
