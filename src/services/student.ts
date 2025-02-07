import { students } from "../db/schema";
import { db } from "../db/db";
import bcrypt from "bcrypt";
import { NewStudent, StudentExist } from "../types/types";
import { eq } from "drizzle-orm";

const createPasswordHash = async (password: string) => {
	const saltRound = 10;
	return await bcrypt.hash(password, saltRound);
};

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
	const student = await db
		.select(returnedData)
		.from(students)
		.where(eq(students.id, id));

	return student;
};

const updateStudent = async (
	id: string,
	object: StudentExist,
): Promise<StudentExist | null> => {
	const results = await db
		.update(students)
		.set(object)
		.where(eq(students.id, id))
		.returning(returnedData);

	return results.length > 0 ? results[0] : null;
};

const addStudent = async (object: NewStudent) => {
	const { password, ...updateStudent } = object;

	const passwordHash = await createPasswordHash(password);

	const newObject = {
		...updateStudent,
		passwordHash,
	};

	const savedStudent = await db
		.insert(students)
		.values(newObject)
		.returning(returnedData);

	return savedStudent.length > 0 ? savedStudent[0] : null;
};

const removeStudent = async (id: string) => {
	const deletedStudent = await db
		.delete(students)
		.where(eq(students.id, id))
		.returning({ id: students.id });

	return deletedStudent.length > 0 ? deletedStudent[0] : null;
};

export default {
	getAllStudents,
	getStudent,
	updateStudent,
	addStudent,
	removeStudent,
};
