import { Router } from "express";
import { handleUserLogin, handleUserLogout, handleUserSignup } from "../controllers/user.contraller.js"
const userRouter = Router();

userRouter.post("/", handleUserSignup);

userRouter.post("/login", handleUserLogin);

userRouter.post("/logout", handleUserLogout)

export default userRouter;