import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const AuthUserId = createParamDecorator((_data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();
  return request.userId;
});
