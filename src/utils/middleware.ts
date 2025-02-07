import { Request, Response } from "express";

const unknownEndpoint = (_req: Request, res: Response) => {
	res.status(404).json({ error: "unknown endpoint" });
};

export default {
	unknownEndpoint,
};
