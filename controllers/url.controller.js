import Url from "../model/Url.js"
import { nanoid } from "nanoid"

export async function createShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ message: "URL not found" });
    const id = nanoid(8);

    const url = await Url.create({
        shortId: id,
        originalUrl: body.url,
        visitedHistory: [],
        createdBy: req.user?._id
    })
    // Redirect to home page with shortId as query param
    return res.redirect("/?shortId=" + id);
}

export async function deleteUrl(req, res) {
    const shortId = req.params.shortId;
    if (!shortId) return res.status(404).json({ message: "ShortId not found" })
    try {
        const url = await Url.deleteOne({ shortId: shortId });
        if (!url) return res.status(400).json({ message: "Inavalid shortId" })
        return res.status(200).json({ message: "Url deleted successfully", url })
    } catch (err) {
        console.log("Error while deleting Url", err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export async function getAllUrls(req, res) {
    try {
        const urls = await Url.find({});
        console.log("Fetched URLs:", urls);
        if (!urls) return res.status(400).json({ mesage: "Urls Not found" })
        return res.status(200).json({ message: "All urls feteched successfully", urls })
    } catch (err) {
        console.log("Error while getting Url", err)
        return res.status(500).json({ message: "Internal server error" })
    }
}