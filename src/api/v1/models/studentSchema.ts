import { z } from "zod";

export const studentSchema = z.object({
	id: z.string(),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email({ message: "Invalid email address" }),
	programme: z.string().min(1, "Programme is required"),
});

export const updateStudentSchema = studentSchema.omit({
	id: true,
});

export const newStudentSchema = studentSchema
	.omit({
		id: true,
	})
	.extend({
		password: z.string().min(8, "password must be at least 8 characters long"),
	});
