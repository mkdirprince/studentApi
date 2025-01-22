import "dotenv/config";

const PORT = process.env.PORT || 3000;
const POSTGRES_URL = process.env.POSTGRES_URL;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

export default {
  PORT,
  POSTGRES_URL,
  POSTGRES_PASSWORD,
};
