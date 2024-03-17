import { DatabaseModule, HashingModule } from "@montelo/api-common";
import { Module } from "@nestjs/common";
import { ApiKeyController } from "./apiKey.controller";
import { ApiKeyService } from "./apiKey.service";


@Module({
  imports: [DatabaseModule, HashingModule],
  controllers: [ApiKeyController],
  providers: [ApiKeyService],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
