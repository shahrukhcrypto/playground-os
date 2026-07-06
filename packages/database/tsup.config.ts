import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/client.ts', 'src/env.ts', 'src/schema/index.ts'],
  format: ['esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['drizzle-orm', 'postgres', 'dotenv', 'zod'],
});
