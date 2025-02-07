import studentController from "../controller/student";
import { Router } from "express";

const studenRouter = Router();

studenRouter.get("/", studentController.getAllStudents);
studenRouter.get("/:id", studentController.getStudent);
studenRouter.put("/:id", studentController.updateStudent);
studenRouter.post("/", studentController.addStudent);
studenRouter.delete("/:id", studentController.removeStudent);

export default studenRouter;
