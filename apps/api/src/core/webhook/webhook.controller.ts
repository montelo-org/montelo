import { Clerk, WebhookEvent, createClerkClient } from "@clerk/clerk-sdk-node";
import { Controller, Get, Post, RawBodyRequest, Req, Res, UnauthorizedException } from "@nestjs/common";
import { Client, Snowflake } from "discord.js";
import { Request, Response } from "express";
import { Webhook } from "svix";
import { EnvService } from "../../env";
import { OrganizationService } from "../organization/organization.service";
import { TraceService } from "../trace/trace.service";

@Controller("webhook")
export class WebhookController {
  private clerkClient: ReturnType<typeof Clerk>;
  private discordClient: Client;

  constructor(
    private envService: EnvService,
    private organizationService: OrganizationService,
    private traceService: TraceService,
  ) {
    this.clerkClient = createClerkClient({
      secretKey: envService.get("CLERK_SECRET_KEY"),
    });

    this.discordClient = new Client({
      intents: ["Guilds", "GuildMessages"],
    });
    this.discordClient.login(envService.get("DISCORD_TOKEN"));
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
      const firstName = evt.data.first_name;
      const lastName = evt.data.last_name;
      const email = evt.data.email_addresses[0].email_address;

      // then createProject them on our service
      const project = await this.organizationService.createProject({
        userId,
        params: {
          name: "Project X",
          envNames: [],
        },
      });

      const devEnv = project.environments.find((env) => env.name === "Development")!;
      await this.traceService.createDefaultTrace(devEnv.id);

      await this.clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          personalProjectId: project.id,
          personalEnvId: devEnv.id,
        },
      });

      // new users channel
      const channel = await this.discordClient.channels.fetch("1221562587288965189" as Snowflake);
      if (channel && channel.isTextBased() && this.envService.get("NODE_ENV") === "production") {
        const formattedMessage = `🎉 **${firstName} ${lastName}** just signed up! 🎉\n\n**Email:** ${email}\n**User ID:** ${userId}\n**Project ID:** ${project.id}\n**Development Env ID:** ${devEnv.id}`;
        await channel.send(formattedMessage);
      }
    } else if (eventType === "user.deleted") {
      // TODO: Delete the user's projects
    }

    return res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  }
}
