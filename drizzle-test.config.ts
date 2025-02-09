import { defineConfig } from "drizzle-kit";
import config from "./src/utils/config";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: "localhost",
    url: config.TEST_POSTGRES_URL,
    user: "postgres",
    password: config.TEST_POSTGRES_PASSWORD,
    database: "postgres",
    ssl: false,
  },
  verbose: true,
  strict: true,
});
