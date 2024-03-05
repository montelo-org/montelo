import { Prisma } from "@montelo/db";

const apiKeyWithEnvironment = Prisma.validator<Prisma.ApiKeyDefaultArgs>()({
  include: {
    environment: true,
  },
});
export type ApiKeyWithEnvironment = Prisma.ApiKeyGetPayload<typeof apiKeyWithEnvironment>;
