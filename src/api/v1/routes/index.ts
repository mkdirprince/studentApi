import { Router } from "express";
import studentRouter from "./student";

const router = Router();

router.use("/api/v1/students", router);

export default router;
