import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();
export const generateToken = (user) => {

    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.rol, 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } 
    );
  };
  
