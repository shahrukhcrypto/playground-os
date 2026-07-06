import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url().default('postgresql://postgres:postgres@localhost:5432/playground'),
});

export const env = envSchema.parse(process.env);

export type DatabaseEnv = z.infer<typeof envSchema>;
