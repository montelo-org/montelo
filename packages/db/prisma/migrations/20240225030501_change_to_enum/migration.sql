/*
  Warnings:

  - Changed the type of `type` on the `log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LogTypes" AS ENUM ('MANUAL', 'OPENAI');

-- AlterTable
ALTER TABLE "log" DROP COLUMN "type",
ADD COLUMN     "type" "LogTypes" NOT NULL;
