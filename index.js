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


app.use("/",checkAuth, staticRoutes);
app.use("/url", Auth, UrlRoutes);
app.use("/user", userRoutes);


app.listen(port,()=>{
    connectDB();
    console.log(`Server running on http://localhost:${port}`)
})
