/*
  Warnings:

  - A unique constraint covering the columns `[name,project_id]` on the table `environment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "environment_name_project_id_key" ON "environment"("name", "project_id");
