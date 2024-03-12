import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class BearerGuard extends AuthGuard("bearer-token") {}
