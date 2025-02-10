import "dotenv/config";
import config from "../utils/config";
import postgres from "postgres";

import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";

const migrationClient = postgres(config.POSTGRES_URL as string, { max: 1 });
const db: PostgresJsDatabase = drizzle(migrationClient);

const main = async () => {
	console.log("Migrating database....");
	await migrate(db, { migrationsFolder: "./src/db/migrations" });
	await migrationClient.end();
	console.log("Database migeated successfully");
};

main();
