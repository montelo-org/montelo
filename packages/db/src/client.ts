import { PrismaClient } from "../prisma/generated/client";

export const prisma = new PrismaClient();

export * from "../prisma/generated/client";
