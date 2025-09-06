import express from "express";
import connectDB from "./db/index.js"
import config from "./config/index.js"
import path from "path";
import cookieParser from "cookie-parser";

import staticRoutes from "./routes/staticRoutes.js"
import userRoutes from "./routes/user.route.js"
import UrlRoutes from "./routes/url.route.js"

import { Auth, checkAuth } from "./middlewares/auth.js"
const app = express();
const { port } = config;

app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())

// add ejs for SSR 
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use((req,res,next) =>{
    res.locals.baseUrl = config.baseUrl || `${req.protocol}://${req.get("host")}`;
    next();
})

app.use("/",checkAuth, staticRoutes);
app.use("/url", Auth, UrlRoutes);
app.use("/user", userRoutes);

// // Connect to DB once (cached for serverless)
// let dbConn;
// async function ensureDB() {
//     if (!dbConn) {
//         dbConn = connectDB();
//     }
//     return dbConn;
// }

// // Attach DB check middleware (runs before routes)
// app.use(async (req, res, next) => {
//     try {
//         await ensureDB();
//         next();
//     } catch (err) {
//         console.error("MongoDB connection error:", err);
//         res.status(500).send("Database connection failed");
//     }
// });

// // Export Express app for Vercel
// export default app;

app.listen(port,()=>{
    connectDB();
    console.log(`Server running on http://localhost:${port}`)
})

