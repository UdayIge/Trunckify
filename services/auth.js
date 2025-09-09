import jwt from 'jsonwebtoken';
import config from '../config/index.js'

export const setUser = (user) => {
    if (!user) return null;
    return jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        config.jwtSecret,
        { expiresIn: '7d' }
    );
}

export const getUser = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (error) {
        return null;
    }
}

export const removeUser = (res) => {
    res.clearCookie("uuid", {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        sameSite: 'lax'
    });
}
