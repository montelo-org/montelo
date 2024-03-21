import { UseGuards } from "@nestjs/common";
import { ClerkAuthGuard } from "./auth.guard";
import { ProjectOrgGuard } from "./project-org.guard";

export const UseAuthGuards = () => {
  return UseGuards(ClerkAuthGuard, ProjectOrgGuard);
};
