import { Module } from "@nestjs/common";
import { HashingService } from "./hashing.service";

@Module({
  providers: [HashingService],
  exports: [HashingService],
})
export class HashingModule {}
