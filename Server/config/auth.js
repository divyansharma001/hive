import { createVerifier } from 'fast-jwt';

const verifier = createVerifier({ key: process.env.TOKEN_SECRET });

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false 
      });
    }

    const decoded = verifier(token);
    req.user = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

export default isAuthenticated;