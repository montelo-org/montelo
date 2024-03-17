import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    try {
      await new Promise<void>((resolve, reject) => {
        const middleware = ClerkExpressRequireAuth();

        middleware(request, response, (err?: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      return true;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException("Authentication failed");
    }
  }
}
