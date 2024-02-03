import { Module } from "@nestjs/common";

import { DatabaseModule } from "../../database";
import { TeamController } from "./team.controller";
import { TeamService } from "./team.service";

@Module({
  imports: [DatabaseModule],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
