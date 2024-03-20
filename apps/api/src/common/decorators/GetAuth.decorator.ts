import { User } from "@clerk/clerk-sdk-node";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export type GetAuthT = {
  sessionId: string;
  userId: string;
  user: User;
  orgId: string;
  orgSlug: string;
};

export const GetAuth = createParamDecorator((_data: unknown, ctx: ExecutionContext): GetAuthT => {
  const request = ctx.switchToHttp().getRequest();
  return request.auth;
});
