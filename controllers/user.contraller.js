import User from '../model/User.js'
import { setUser, removeUser } from "../services/auth.js"
import config from '../config/index.js'

export async function handleUserSignup(req,res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" })
    try{
        await User.create({name,email,password,});
        return res.status(201).redirect("/login?success='User created successfully'");
    }
    catch( err ){
        console.log("Error in user sign-up",err)
        return res.status(500).json({message: "Internal sign-up server error"})
    } 
}

export async function handleUserLogin(req,res) {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields are required" })
    try {
        const user = await User.findOne({ email: email });
        if(!user){
            return res.status(400).redirect("/login?error='Invalid credentials'");
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).redirect("/login?error='Invalid credentials'");
        }
        const token = setUser(user);
        res.cookie("uuid", token, {
            httpOnly: true,
            secure: config.nodeEnv === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.status(200).redirect("/");
    }
    catch (err) {
        console.log("Error in user login ", err)
        return res.status(500).json({ message: "Internal login server error" })
    }
}

export async function handleUserLogout(req,res) {
    try {
        const token = req.cookies.uuid;
        removeUser(res);
        return res.status(200).redirect("/login?error='User logged out successfully'");
    }
    catch (err) {
        console.log("Error in user log-out ", err)
        return res.status(500).json({ message: "Internal logout server error" })
    }
}


