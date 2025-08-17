import { getUser } from "../services/auth.js";

export function checkAuth(req,res,next){
    const uuid = req.cookies?.uuid;
    
    const user = getUser(uuid);
    // if (!user) return res.status(401).redirect("/login");
    req.user = user;
    next();
}

export function Auth(req,res,next){
    const uuid = req.cookies.uuid;
    if (!uuid) return res.status(401).redirect("/login");

    const user = getUser(uuid);
    if (!user) return res.status(401).redirect("/login");

    req.user = user;
    next();
}