import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const EnvId = createParamDecorator((_data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();
  // this is the envId
  return request.user as string;
});
