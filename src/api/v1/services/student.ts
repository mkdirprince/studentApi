import { students } from "../../../db/schema";
import { db } from "../../../db/db";
import { NewStudent, UpdateStudent } from "../../../types/types";
import { eq } from "drizzle-orm";

const returnedData = {
  id: students.id,
  firstName: students.firstName,
  lastName: students.lastName,
  email: students.email,
  programme: students.programme,
};

const getAllStudents = async () => {
  const allStudents = await db.select(returnedData).from(students);

  return allStudents;
};

const getStudent = async (id: string) => {
  const [student] = await db
    .select(returnedData)
    .from(students)
    .where(eq(students.id, id));

  return student;
};

const updateStudent = async (id: string, object: UpdateStudent) => {
  const [updatedStudent] = await db
    .update(students)
    .set(object)
    .where(eq(students.id, id))
    .returning(returnedData);

  return updatedStudent;
};

const addStudent = async (object: NewStudent) => {
  const [savedStudent] = await db
    .insert(students)
    .values(object)
    .returning(returnedData);

  return savedStudent;
};

const removeStudent = async (id: string) => {
  await db.delete(students).where(eq(students.id, id));
};

export default {
  getAllStudents,
  getStudent,
  updateStudent,
  addStudent,
  removeStudent,
};
