import { DatabaseService } from "@montelo/api-common";
import { Injectable } from "@nestjs/common";
import { FullProject } from "./project.types";

@Injectable()
export class ProjectService {
  constructor(private db: DatabaseService) {}

  async findById(id: string): Promise<FullProject> {
    return this.db.project.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        environments: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.db.project.delete({
      where: {
        id,
      },
    });
  }
}
