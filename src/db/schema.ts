import { pgTable, text } from "drizzle-orm/pg-core";
import { v1 as uuid7 } from "uuid";

const createPrefix = (table: string) => {
	return `${table}_${uuid7()}`;
};

export const students = pgTable("students", {
	id: text()
		.notNull()
		.$defaultFn(() => createPrefix("student")),
	firstName: text().notNull(),
	lastName: text().notNull(),
	email: text().notNull().unique(),
	password: text().notNull(),
	programme: text().notNull(),
});
