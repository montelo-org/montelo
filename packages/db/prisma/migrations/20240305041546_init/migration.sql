-- CreateEnum
CREATE TYPE "LogSources" AS ENUM ('MANUAL', 'OPENAI', 'ANTHROPIC', 'MISTRAL', 'COHERE');

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "environment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "environment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_key" (
    "id" TEXT NOT NULL,
    "env_id" TEXT NOT NULL,
    "public" TEXT NOT NULL,
    "private" TEXT NOT NULL,
    "combined" TEXT NOT NULL,
    "viewed" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "api_key_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log" (
    "id" TEXT NOT NULL,
    "trace_id" TEXT NOT NULL,
    "env_id" TEXT NOT NULL,
    "parent_id" TEXT,
    "name" TEXT NOT NULL,
    "input" JSONB NOT NULL,
    "output" JSONB NOT NULL,
    "source" "LogSources" NOT NULL,
    "model" TEXT,
    "extra" JSONB,
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "duration" DOUBLE PRECISION,
    "input_tokens" INTEGER,
    "output_tokens" INTEGER,
    "total_tokens" INTEGER,
    "input_cost" DOUBLE PRECISION,
    "output_cost" DOUBLE PRECISION,
    "total_cost" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trace" (
    "id" TEXT NOT NULL,
    "env_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "input_tokens" INTEGER NOT NULL,
    "output_tokens" INTEGER NOT NULL,
    "total_tokens" INTEGER NOT NULL,
    "input_cost" DOUBLE PRECISION NOT NULL,
    "output_cost" DOUBLE PRECISION NOT NULL,
    "total_cost" DOUBLE PRECISION NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "user_id" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "extra" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_name_org_id_key" ON "project"("name", "org_id");

-- CreateIndex
CREATE UNIQUE INDEX "api_key_env_id_key" ON "api_key"("env_id");

-- CreateIndex
CREATE UNIQUE INDEX "api_key_public_key" ON "api_key"("public");

-- CreateIndex
CREATE UNIQUE INDEX "api_key_private_key" ON "api_key"("private");

-- CreateIndex
CREATE UNIQUE INDEX "api_key_combined_key" ON "api_key"("combined");

-- CreateIndex
CREATE INDEX "log_env_id_start_time_idx" ON "log"("env_id", "start_time");

-- CreateIndex
CREATE INDEX "trace_env_id_idx" ON "trace"("env_id");

-- AddForeignKey
ALTER TABLE "environment" ADD CONSTRAINT "environment_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_key" ADD CONSTRAINT "api_key_env_id_fkey" FOREIGN KEY ("env_id") REFERENCES "environment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_env_id_fkey" FOREIGN KEY ("env_id") REFERENCES "environment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_trace_id_fkey" FOREIGN KEY ("trace_id") REFERENCES "trace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
