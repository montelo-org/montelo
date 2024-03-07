import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    // Wrap the ClerkExpressRequireAuth middleware call in a promise
    try {
      await new Promise<void>((resolve, reject) => {
        const middleware = ClerkExpressRequireAuth();

        // Call the middleware manually, passing the Node.js request, response, and a callback function
        middleware(request, response, (err?: any) => {
          if (err) {
            // If there's an error (e.g., authentication failed), reject the promise
            reject(err);
          } else {
            // If the middleware calls `next()` without errors, authentication succeeded
            resolve();
          }
        });
      });
      // If the promise resolves, authentication succeeded, allow the request
      return true;
    } catch (err) {
      // If the promise is rejected, log the error and throw an UnauthorizedException to block the request
      console.error(err);
      throw new UnauthorizedException("Authentication failed");
    }
  }
}
