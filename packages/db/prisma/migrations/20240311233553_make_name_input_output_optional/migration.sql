-- AlterTable
ALTER TABLE "log" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "input" DROP NOT NULL,
ALTER COLUMN "output" DROP NOT NULL;
