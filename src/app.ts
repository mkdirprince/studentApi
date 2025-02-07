import cors from "cors";
import express from "express";
import middleware from "./utils/middleware";
const app = express();

app.use(cors());
app.use(express.json());

app.use(middleware.unknownEndpoint);
export default app;
