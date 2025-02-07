import studentController from "../controller/student";
import middleware from "../../../utils/middleware";
import { Router } from "express";

const studenRouter = Router();

studenRouter.get("/", studentController.getAllStudents);
studenRouter.get("/:id", middleware.validateId, studentController.getStudent);
studenRouter.put(
	"/:id",
	middleware.validateId,
	studentController.updateStudent,
);
studenRouter.post("/", studentController.addStudent);
studenRouter.delete(
	"/:id",
	middleware.validateId,
	studentController.removeStudent,
);

export default studenRouter;
