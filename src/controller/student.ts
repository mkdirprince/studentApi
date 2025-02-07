import { NextFunction, Request, Response, Router } from "express";
import studentService from "../services/student";
import { Student } from "../types/types";
import { newStudentSchema } from "../models/studentSchema";
const studentRouter = Router();

studentRouter.get(
  "/",
  async (_req, res: Response<Student[]>, next: NextFunction) => {
    try {
      const students = await studentService.getAllStudents();
      res.json(students);
    } catch (error) {
      next(error);
    }
  }
);

studentRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

studentRouter.put(
  "/:id",
  async (req: Request, res: Response<Student>, next: NextFunction) => {
    try {
      const id = req.params.id;
      const body = req.body;

      const parsedStudent = newStudentSchema.parse(body);

      const updatedStudent = await studentService.updateStudent(
        id,
        parsedStudent
      );

      res.json(updatedStudent);
    } catch (error) {
      next(error);
    }
  }
);

studentRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    const parsedStudent = newStudentSchema.parse(body);

    const savedStudent = await studentService.addStudent(parsedStudent);

    res.status(201).json(savedStudent);
  } catch (error) {
    next(error);
  }
});

studentRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      await studentService.removeStudent(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);
