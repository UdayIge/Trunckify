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

// Serve static files from views directory (for JS, CSS, etc.)
app.use(express.static(path.resolve("./views")))

// Ensure DB connection before handling any request (serverless safe)
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("MongoDB connection error:", err);
        res.status(500).send("Database connection failed");
    }
});

app.use((req,res,next) =>{
    res.locals.baseUrl = config.baseUrl || `${req.protocol}://${req.get("host")}`;
    next();
})

app.use("/",checkAuth, staticRoutes);
app.use("/url", Auth, UrlRoutes);
app.use("/user", userRoutes);


export default app;


if (process.env.VERCEL !== '1') {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
}

