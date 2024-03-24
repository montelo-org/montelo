import { Clerk, WebhookEvent, createClerkClient } from "@clerk/clerk-sdk-node";
import { Controller, Get, Post, RawBodyRequest, Req, Res, UnauthorizedException } from "@nestjs/common";
import { Request, Response } from "express";
import { Webhook } from "svix";
import { EnvService } from "../../env";
import { OrganizationService } from "../organization/organization.service";
import { TraceService } from "../trace/trace.service";


@Controller("webhook")
export class WebhookController {
  private clerkClient: ReturnType<typeof Clerk>;

  constructor(
    private envService: EnvService,
    private organizationService: OrganizationService,
    private traceService: TraceService,
  ) {
    this.clerkClient = createClerkClient({
      secretKey: envService.get("CLERK_SECRET_KEY"),
    });
  }

  @Get("clerk")
  async getWebhook(@Req() request: RawBodyRequest<Request>, @Res() res: Response) {
    const clerkSecret = this.envService.get("CLERK_WEBHOOK_SECRET");

    const payload = request.rawBody!.toString("utf8");
    const headers = request.headers;

    const svix_id = headers["svix-id"] as string;
    const svix_timestamp = headers["svix-timestamp"] as string;
    const svix_signature = headers["svix-signature"] as string;

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new UnauthorizedException();
    }

    const wh = new Webhook(clerkSecret);
    try {
      wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
      return res.status(200);
    } catch (err: any) {
      // Console log and return error
      console.log("Webhook failed to verify. Error:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

  @Post("clerk")
  async webhook(@Req() request: RawBodyRequest<Request>, @Res() res: Response) {
    const clerkSecret = this.envService.get("CLERK_WEBHOOK_SECRET");

    const payload = request.rawBody!.toString("utf8");
    const headers = request.headers;

    const svix_id = headers["svix-id"] as string;
    const svix_timestamp = headers["svix-timestamp"] as string;
    const svix_signature = headers["svix-signature"] as string;

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new UnauthorizedException();
    }

    const wh = new Webhook(clerkSecret);

    let evt: WebhookEvent;
    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err: any) {
      // Console log and return error
      console.log("Webhook failed to verify. Error:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // Grab the ID and TYPE of the Webhook
    const eventType = evt.type;

    if (eventType === "user.created") {
      const userId = evt.data.id;
      const firstName = evt.data.first_name.split(" ")[0];
      const orgName = `${firstName}'s Org`;
      const orgSlug = `${firstName}-${userId.substring(userId.length - 6, userId.length)}`
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "");

      // createProject the org
      const org = await this.clerkClient.organizations.createOrganization({
        name: orgName,
        slug: orgSlug,
        createdBy: evt.data.id,
      });

      // then createProject them on our service
      const { project, environments } = await this.organizationService.createProject(org.id, {
        name: "Project X",
        envNames: [],
      });

      // TODO create default trace on the dev env
      // await this.traceService.createDefaultTrace();

      const devEnv = environments.find((env) => env.name === "Development")!;

      await this.clerkClient.organizations.updateOrganizationMetadata(org.id, {
        publicMetadata: {
          defaultProjectId: project.id,
          defaultEnvId: devEnv.id,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  }
}
