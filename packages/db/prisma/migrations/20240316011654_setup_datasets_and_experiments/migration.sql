-- CreateTable
CREATE TABLE "dataset" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "input_schema" JSONB NOT NULL,
    "output_schema" JSONB NOT NULL,
    "env_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dataset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datapoint" (
    "id" TEXT NOT NULL,
    "input" JSONB,
    "output" JSONB,
    "dataset_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "datapoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiment" (
    "id" TEXT NOT NULL,
    "dataset_id" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experiment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiment_run" (
    "id" TEXT NOT NULL,
    "input" JSONB,
    "output" JSONB,
    "experiment_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experiment_run_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dataset_name_env_id_key" ON "dataset"("name", "env_id");

-- AddForeignKey
ALTER TABLE "dataset" ADD CONSTRAINT "dataset_env_id_fkey" FOREIGN KEY ("env_id") REFERENCES "environment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datapoint" ADD CONSTRAINT "datapoint_dataset_id_fkey" FOREIGN KEY ("dataset_id") REFERENCES "dataset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiment_run" ADD CONSTRAINT "experiment_run_experiment_id_fkey" FOREIGN KEY ("experiment_id") REFERENCES "experiment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
