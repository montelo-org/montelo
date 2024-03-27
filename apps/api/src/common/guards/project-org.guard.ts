import { SignedInAuthObject } from "@clerk/clerk-sdk-node";
import { DatabaseService } from "@montelo/api-common";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

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

    const { orgId, userId } = request.auth as SignedInAuthObject;
    if (!orgId && !userId) {
      throw new UnauthorizedException("Missing orgId or userId in the request.");
    }

    const project = await this.db.project.findUniqueOrThrow({
      where: {
        id: projectId,
      },
    });

    const hasAuthorization = project.orgId === orgId || project.userId === userId;
    if (!hasAuthorization) {
      throw new UnauthorizedException("Access to the project is unauthorized.");
    }

    // attach the project to the request object
    request.project = project;

    return true;
  }
}
