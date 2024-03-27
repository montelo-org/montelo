/*
  Warnings:

  - A unique constraint covering the columns `[name,user_id]` on the table `project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "user_id" TEXT,
ALTER COLUMN "org_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "project_name_user_id_key" ON "project"("name", "user_id");
