import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from './env.js';

export type DatabaseClient = ReturnType<typeof drizzle>;

export function createDatabaseClient(connectionString = env.DATABASE_URL): DatabaseClient {
  const client = postgres(connectionString, { max: 1 });
  return drizzle(client);
}
