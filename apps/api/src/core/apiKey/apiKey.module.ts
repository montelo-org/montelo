import { Module } from "@nestjs/common";
import { HashingModule } from "../../common/services/hashing/hashing.module";
import { DatabaseModule } from "../../database";
import { ApiKeyController } from "./apiKey.controller";
import { ApiKeyService } from "./apiKey.service";

@Module({
  imports: [DatabaseModule, HashingModule],
  controllers: [ApiKeyController],
  providers: [ApiKeyService],
  exports: [ApiKeyService],
})
export class ApiKeyModule {}
