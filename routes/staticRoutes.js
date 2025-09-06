import { Router } from "express";
import Url from "../model/Url.js"

const router = Router();

router.get("/", async (req, res) => {
    try {
        const urls = await Url.find({ createdBy: req.user?._id });
        const shortId = req.query.shortId;
        return res.status(200).render("home", { urls, shortId });
    } catch (err) {
        console.log("Error while getting Url", err)
        return res.status(500).json({ message: "Internal server error" })
    }
})


router.get("/login",(req, res) => {
    const error = req.query.error;
    return res.status(200).render("login",{
        error: error ? error : null
    });
})

router.get("/signup",(req, res) => {
    const error = req.query.error;
    return res.status(200).render("signup",{
        error: error ? error : null
    });
})

router.get("/home",(req, res) => {
    return res.status(200).render("home");
})

export default router;