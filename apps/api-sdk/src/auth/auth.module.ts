import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { DatabaseModule, HashingModule } from "@montelo/api-common";
import { AuthService } from "./auth.service";
import { BearerTokenStrategy } from "./bearer-token.strategy";

@Module({
  imports: [PassportModule, DatabaseModule, HashingModule],
  providers: [AuthService, BearerTokenStrategy],
})
export class AuthModule {}
