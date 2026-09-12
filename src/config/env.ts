import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_NAME: z.string().trim().min(1).default("LifeTrack"),
  APP_URL: z.url(),
  DATABASE_URL: z.string().url().startsWith("postgresql://"),
});

export type Environment = z.infer<typeof environmentSchema>;

export function parseEnvironment(values: Record<string, string | undefined>): Environment {
  const result = environmentSchema.safeParse(values);
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid environment configuration: ${details}`);
  }
  return result.data;
}

let environment: Environment | undefined;
export function getEnvironment(): Environment {
  environment ??= parseEnvironment(process.env);
  return environment;
}
