import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import config from "../utils/config";
import * as schema from "./schema";

const url =
	process.env.NODE_ENV === "production"
		? config.POSTGRES_URL
		: config.TEST_POSTGRES_URL;

export const client = postgres(url as string);

export const db = drizzle(client, {
	schema,
	logger: process.env.NODE_ENV === "development",
});
