import { defineConfig } from "drizzle-kit";
import config from "./src/utils/config";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: "postgres",
    port: 5432,
    url: config.POSTGRES_URL,
    user: "postgres",
    password: config.POSTGRES_PASSWORD,
    database: "postgres",
    ssl: false,
  },
  verbose: true,
  strict: true,
});
