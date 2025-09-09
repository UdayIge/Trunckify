import mongoose from "mongoose";
import config from "../config/index.js";

const { mongoURI } = config;

if (!mongoURI) {
	throw new Error("MongoDB URI is not defined in the configuration");
}

// Cache the connection across invocations (serverless friendly)
let cached = globalThis.mongooseCache;
if (!cached) {
	cached = globalThis.mongooseCache = { conn: null, promise: null };
}

async function connectDB() {
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(mongoURI, {
				bufferCommands: false,
			})
			.then((mongooseInstance) => {
				return mongooseInstance;
			});
	}

	try {
		cached.conn = await cached.promise;
		return cached.conn;
	} catch (error) {
		cached.promise = null;
		throw error;
	}
}

export default connectDB;
