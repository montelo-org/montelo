import { Project } from "@montelo/db";
import { Injectable } from "@nestjs/common";

import { DatabaseService } from "../../database";
import { Environments } from "../environment/environment.enums";
import { CreateProjectInput, FullProject } from "./project.types";

@Injectable()
export class ProjectService {
  constructor(private db: DatabaseService) {}

  async findById(id: string): Promise<FullProject> {
    return this.db.project.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        team: true,
        environments: true,
      },
    });
  }

  async create(params: CreateProjectInput): Promise<Project> {
    const isRestrictedEnvironmentUsed = params.envNames.some(
      (el) => el === Environments.PRODUCTION || el === Environments.DEVELOPMENT,
    );
    if (isRestrictedEnvironmentUsed) {
      throw new Error(
        "Restricted environment names 'PRODUCTION' or 'DEVELOPMENT' cannot be used in this context.",
      );
    }

    const envNamesAsObj = params.envNames.map((name) => ({ name }));
    console.log("envNamesAsObj: ", envNamesAsObj)
    return this.db.project.create({
      data: {
        name: params.name,
        team: {
          connect: {
            id: params.teamId,
          },
        },
        environments: {
          createMany: {
            data: [
              {
                name: Environments.DEVELOPMENT,
              },
              {
                name: Environments.PRODUCTION,
              },
              ...envNamesAsObj,
            ],
          },
        },
      },
    });
  }
}
