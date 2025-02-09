import { Router } from "express";
import { db } from "../db/db";
import { sql } from "drizzle-orm";

const router = Router();

router.get("/healthcheck", async (_req, res) => {
	try {
		await db.execute(sql`SELECT 1`);

		res.status(200).json({
			status: "OK",
			uptime: process.uptime(),
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({
			status: "ERROR",
			message: "Service unavailable",
			timestamp: new Date().toISOString(),
		});
	}
});

export default router;
