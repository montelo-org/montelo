import { type Project } from "@montelo/db";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export type GetProjectT = Project;

export const GetProject = createParamDecorator((_data: unknown, ctx: ExecutionContext): GetProjectT => {
  const request = ctx.switchToHttp().getRequest();
  return request.project;
});
