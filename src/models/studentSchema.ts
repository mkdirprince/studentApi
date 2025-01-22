import { z } from "zod";

export const studentSchema = z.object({
	id: z.string(),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email({ message: "Invalid email address" }),
	passwordHash: z.string(),
	programme: z.string().min(1, "Programme is required"),
});

export const newStudentSchema = studentSchema
	.omit({
		id: true,
		passwordHash: true,
	})
	.extend({
		password: z.string().min(8, "password must be at least 8 characters long"),
	});
