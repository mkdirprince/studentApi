import { NextFunction, Request, Response } from "express";
import { isValidId } from "./isValidId";
import { ZodError } from "zod";
import { PostgresError } from "postgres";

const unknownEndpoint = (_req: Request, res: Response) => {
	res.status(404).json({ error: "unknown endpoint" });
};

const CONSTRAINT_ERRORS: Record<string, string> = {
	students_email_unique: "Email address is already in use",
} as const;

const errorHandler = (
	error: unknown,
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (error instanceof ZodError) {
		if (process.env.NODE_ENV !== "test") {
			console.log(error.errors);
		}

		if (error.errors[0].code === "invalid_type") {
			res
				.status(400)
				.json({ error: `${error.errors[0].path}: ${error.errors[0].message}` });
		} else {
			res.status(400).json({ error: `${error.errors[0].message}` });
		}
	} else if (error instanceof PostgresError) {
		if (process.env.NODE_ENV !== "test") {
			console.log(error);
		}
		if (error.code === "23505" && error.constraint_name) {
			res.status(400).json({ error: CONSTRAINT_ERRORS[error.constraint_name] });
		} else if (error.code === "42P01") {
			res.status(400).json({ error: error.message });
		} else {
			res.status(500).json({
				error: "",
			});
		}
	} else if (error instanceof Error) {
		if (process.env.NODE_ENV !== "test") {
			console.log(error);
		}
		res.status(500).json({
			error: "Server is temporarily unavailable. Please try again later.",
		});
	}

	next(error);
};

const validateId = (req: Request, res: Response, next: NextFunction) => {
	const id = req.params.id;

	const uuidPart = id.split("_")[1];

	if (!isValidId(uuidPart) || !uuidPart) {
		res.status(400).json({ error: "malformatted Id" });
		return;
	}

	next();
};

export default {
	unknownEndpoint,
	errorHandler,
	validateId,
};
