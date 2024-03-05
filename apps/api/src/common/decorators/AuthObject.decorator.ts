import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { SignedInAuthObject } from "@clerk/clerk-sdk-node";

export const AuthObject = createParamDecorator((_data: unknown, ctx: ExecutionContext): SignedInAuthObject => {
  const request = ctx.switchToHttp().getRequest();
  return request.auth;
});

export type AuthObjectT = SignedInAuthObject;
