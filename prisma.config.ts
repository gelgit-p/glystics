import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // Path to your main schema file or schema directory
  schema: "prisma/schema.prisma",

  // Configuration for your database connection
  datasource: {
    // url: env("DATABASE_URL"),
    url: process.env.DATABASE_URL ?? '',
    //  shadowDatabaseUrl: env("SHADOW_DATABASE_URL"), 
  },

  // Configuration for database migrations and seeding
  migrations: {
    path: "prisma/migrations",
    // seed: "tsx prisma/seed.ts",
  },
});
