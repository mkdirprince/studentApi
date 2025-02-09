import { NextFunction, Request, Response } from "express";
import studentService from "../services/student";
import { Student } from "../../../types/types";
import { newStudentSchema, updateStudentSchema } from "../models/studentSchema";

const getAllStudents = async (
	_req: Request,
	res: Response<Student[]>,
	next: NextFunction,
) => {
	try {
		const students = await studentService.getAllStudents();
		res.json(students);
	} catch (error) {
		next(error);
	}
};

const getStudent = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id;

		const student = await studentService.getStudent(id);

		if (!student) {
			res.status(404).json({ error: "student not found" });
			return;
		}

		res.json(student);
	} catch (error) {
		next(error);
	}
};

const updateStudent = async (
	req: Request,
	res: Response<Student>,
	next: NextFunction,
) => {
	try {
		const id = req.params.id;
		const body = req.body;

		const parsedStudent = updateStudentSchema.parse(body);

		const updatedStudent = await studentService.updateStudent(
			id,
			parsedStudent,
		);

		res.json(updatedStudent);
	} catch (error) {
		next(error);
	}
};

const addStudent = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const body = req.body;

		const parsedStudent = newStudentSchema.parse(body);

		const savedStudent = await studentService.addStudent(parsedStudent);

		res.status(201).json(savedStudent);
	} catch (error) {
		next(error);
	}
};

const removeStudent = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const id = req.params.id;

	try {
		await studentService.removeStudent(id);
		res.status(204).end();
	} catch (error) {
		next(error);
	}
};

export default {
	getAllStudents,
	getStudent,
	updateStudent,
	removeStudent,
	addStudent,
};
