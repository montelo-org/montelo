import { Module } from "@nestjs/common";
import { EnvModule } from "../../env";
import { OrganizationModule } from "../organization/organization.module";
import { TraceModule } from "../trace/trace.module";
import { WebhookController } from "./webhook.controller";


@Module({
  imports: [EnvModule, OrganizationModule, TraceModule],
  controllers: [WebhookController],
})
export class WebhookModule {}
