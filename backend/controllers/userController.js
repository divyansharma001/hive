import db from "../config/database.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'


export const Register = async (req, res) => {
  try {
    const { email, name, username, password } = req.body;
 
    if (!email || !name || !username || !password) {
      return res.status(401).json({
        message: "All fields are required",
        success: false,
      });
    }
    const userResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = userResult.rows[0];

    if (user) {
      return res.status(401).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 18);

    await db.query(
      "INSERT INTO users (email, name, username, password) VALUES ($1,$2,$3,$4)",
      [email, name, username, hashedPassword]
    );


    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res)=>{
try {
  
  const {email, password} = req.body;

  if( !email || !password){
    return res.status(401).json({
      message: "All fields are required"
    })
  }

  const userResult = await db.query('SELECT * FROM users WHERE email = $1',
    [email]
  )

  const user = userResult.rows[0];
  
  if(!user){
    return res.status(401).json({
      message: "User does not exists with this email",
      success: false
    })
  }

  const isMatched = await bcryptjs.compare(password, user.password)
  if(!isMatched){
    return res.status(401).json({
      message: "Incorrect Credentials",
      success: true,
    })
  }
  
  const tokenData = {
    userId : user.id
  }

  const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "7d" });
  return res.status(201).cookie("token", token, {expiresIn: "7d", httpOnly: true}).json({
    message:`Welcome back ${user.name}`,
    success: true
  })

} catch (error) {
  console.log(error)
}
}

export const logout = (req, res) => {
  return res.cookie("token", "", { expires: new Date(0) }).json({
    message: "User logged out successfully",
    success: true,
  });
}
