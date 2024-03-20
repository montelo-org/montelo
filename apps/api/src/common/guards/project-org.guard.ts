import { SignedInAuthObject } from "@clerk/clerk-sdk-node";
import { DatabaseService } from "@montelo/api-common";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";


@Injectable()
export class ProjectOrgGuard implements CanActivate {
  constructor(private readonly db: DatabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const projectId = request.headers["x-montelo-project-id"] as string | undefined;
    if (!projectId?.length) {
      throw new UnauthorizedException("Missing project identifier.");
    }
    const orgId = (request.auth as SignedInAuthObject).orgId;
    if (!orgId) {
      throw new UnauthorizedException("Missing organization identifier.");
    }

    try {
      const project = await this.db.project.findUniqueOrThrow({
        where: {
          id: projectId,
        },
      });
      const belongsToOrg = project.orgId === orgId;

      if (!belongsToOrg) {
        throw new UnauthorizedException("Access to the project is unauthorized.");
      }

      // attach the project to the request object
      request.project = project;

      return true;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException("Authentication failed");
    }
  }
}
