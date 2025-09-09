import dotenv from "dotenv";

dotenv.config(); // Load environment variables from default .env file or custom path

const config = {
  mongoURI: process.env.MONGO_URL,
  port: process.env.PORT || 5000,
  baseUrl: process.env.BASE_URL || "http://localhost:5000",
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV,
};

export default config;
