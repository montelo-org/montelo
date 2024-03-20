import { DatabaseModule } from "@montelo/api-common";
import { Module } from "@nestjs/common";
import { ApiKeyModule } from "../apiKey/apiKey.module";
import { OrganizationController } from "./organization.controller";
import { OrganizationService } from "./organization.service";

@Module({
  imports: [DatabaseModule, ApiKeyModule],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
