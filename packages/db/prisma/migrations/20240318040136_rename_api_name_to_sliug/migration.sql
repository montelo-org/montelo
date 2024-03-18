/*
  Warnings:

  - You are about to drop the column `api_name` on the `dataset` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug,env_id]` on the table `dataset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `dataset` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "dataset_api_name_env_id_key";

-- AlterTable
ALTER TABLE "dataset" DROP COLUMN "api_name",
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "dataset_slug_env_id_key" ON "dataset"("slug", "env_id");
