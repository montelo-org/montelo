import { Dataset, Experiment, Prisma } from "@montelo/db";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database";
import { CreateDatasetParams, DatasetWithDatapoints, ExperimentsByIdOpts, FullDatasetByIdOpts } from "./dataset.types";


@Injectable()
export class DatasetService {
  constructor(private db: DatabaseService) {}

  async getAllDatasets(envId: string): Promise<Dataset[]> {
    return this.db.dataset.findMany({
      where: {
        envId,
      },
    });
  }

  async getFullDatasetById(
    datasetId: string,
    options?: FullDatasetByIdOpts,
  ): Promise<{
    dataset: DatasetWithDatapoints;
    totalCount: number;
  }> {
    const datasetPromise = this.db.dataset.findUniqueOrThrow({
      where: {
        id: datasetId,
      },
      include: {
        datapoints: {
          take: options?.take || 50,
          skip: options?.skip || 0,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    const totalCountPromise = this.db.datapoint.count({
      where: {
        datasetId,
      },
    });

    const [dataset, totalCount] = await Promise.all([datasetPromise, totalCountPromise]);

    return { dataset, totalCount };
  }

  async getDatasetExperiments(datasetId: string, options?: ExperimentsByIdOpts): Promise<Experiment[]> {
    return this.db.experiment.findMany({
      where: {
        datasetId,
      },
      take: options?.take,
      skip: options?.skip,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getByName(params: Prisma.DatasetSlugEnvIdCompoundUniqueInput): Promise<Dataset> {
    return this.db.dataset.findUniqueOrThrow({
      where: {
        slug_envId: params,
      },
    });
  }

  async create(params: CreateDatasetParams): Promise<Dataset> {
    const slug = params.name.replace(/\W+/g, "-").toLowerCase();
    return this.db.dataset.create({
      data: { ...params, slug },
    });
  }

  async delete(datasetId: string): Promise<void> {
    await this.db.dataset.delete({
      where: {
        id: datasetId,
      },
    });
  }
}
