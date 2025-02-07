import { studentSchema } from "../api/v1/models/studentSchema";
import { newStudentSchema } from "../api/v1/models/studentSchema";
import { z } from "zod";

export type Student = z.infer<typeof studentSchema>;
export type NewStudent = z.infer<typeof newStudentSchema>;
