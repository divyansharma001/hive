import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({
     path: '../.env'
});

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
  
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false 
            });
        }

        const decode = jwt.verify(token, process.env.TOKEN_SECRET);

        req.user = decode.userId;

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export default isAuthenticated;
