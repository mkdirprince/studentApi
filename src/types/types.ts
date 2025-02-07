import { studentSchema } from "../models/studentSchema";
import { newStudentSchema } from "../models/studentSchema";
import { z } from "zod";

export type Student = z.infer<typeof studentSchema>;
export type NewStudent = z.infer<typeof newStudentSchema>;
