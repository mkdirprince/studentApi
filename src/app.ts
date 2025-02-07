import cors from "cors";
import express from "express";
import morgan from "morgan";
import studenRouter from "./api/v1/routes/index";
import middleware from "./utils/middleware";
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(studenRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
export default app;
