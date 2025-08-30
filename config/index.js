import dotenv from "dotenv";

dotenv.config(); // Load environment variables from default .env file or custom path

const config = {
  mongoURI: process.env.MONGO_URL,
  dbName: process.env.DB_NAME,
  port: process.env.PORT || 5000,
  baseUrl: process.env.BASE_URL || "http://localhost:5000"
};

export default config;
