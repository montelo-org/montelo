import { PrismaClient } from "../prisma/generated/client";

export const prisma = new PrismaClient({
  log: ["error"]
});

export * from "../prisma/generated/client";
