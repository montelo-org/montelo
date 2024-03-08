import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { HashingModule } from "../common/services/hashing/hashing.module";
import { DatabaseModule } from "../database";
import { AuthService } from "./auth.service";
import { BearerTokenStrategy } from "./bearer-token.strategy";

@Module({
  imports: [PassportModule, DatabaseModule, HashingModule],
  providers: [AuthService, BearerTokenStrategy],
})
export class AuthModule {}
