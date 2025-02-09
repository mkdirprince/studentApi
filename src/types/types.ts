import {
	newStudentSchema,
	studentSchema,
	updateStudentSchema,
} from "../api/v1/models/studentSchema";
import { z } from "zod";

export type Student = z.infer<typeof studentSchema>;
export type NewStudent = z.infer<typeof newStudentSchema>;
export type UpdateStudent = z.infer<typeof updateStudentSchema>;
