import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database";
import { TraceController } from "./trace.controller";
import { TraceService } from "./trace.service";

@Module({
  imports: [DatabaseModule],
  controllers: [TraceController],
  providers: [TraceService],
  exports: [TraceService],
})
export class TraceModule {}
