import { Router } from "express";
import { getAllUrls, deleteUrl, createShortUrl } from "../controllers/url.controller.js"
import Url from "../model/Url.js";
const router = Router();

router.post("/", createShortUrl);

router.delete("/:shortId", deleteUrl);

router.get("/:shortid", async (req, res) => {
    const shortid = req.params.shortid
    try {
        const url = await Url.findOneAndUpdate({ shortId: shortid }, {
            $push: {
                visitedHistory: {
                    visitedTime: Date.now()
                }
            }
        })
        if (!url) return res.status(404).json({ message: "Url not found" })

        let redirectUrl = url.originalUrl;

        if (redirectUrl.includes("http")) {
            return res.status(200).redirect(redirectUrl);
        } else {
            return res.status(200).redirect("http://" + redirectUrl);
        }
    }
    catch (err) {
        console.log("Error in redirection to orignal url :", err)
        return res.status(500).json({ error: "Internal server Error" })
    }

})
router.get("/show/all", getAllUrls);

export default router;
