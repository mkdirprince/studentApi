import express from "express";
import cors from "cors";
import config from "./utils/config";

const app = express();
app.use(cors());

app.listen(config.PORT, () => {
	console.log(`server running on port ${config.PORT}`);
});
