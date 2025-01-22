import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import config from "../utils/config";
import * as schema from "./schema";

const client = postgres(config.POSTGRES_URL as string);

export const db = drizzle(client, {
  schema,
  logger: process.env.NODE_ENV === "development",
});
