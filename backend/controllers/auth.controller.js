import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const generateTokens=(userid)=>{
  const accessToken=jwt.sign({userid},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
  const refreshToken=jwt.sign({userid},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
  return{refreshToken,accessToken}
};
const setCookies = (res, accessToken, refreshToken) => {
	res.cookie("accessToken", accessToken, {
		httpOnly: true,
		
		sameSite: "strict", 
		maxAge: 15 * 60 * 1000, 
	});
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true, 
		
		sameSite: "strict", 
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
};
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json({ error: "User already registered" });
    }

    const user = new User({ name, email, password });
    
    const { refreshToken, accessToken } = generateTokens(user._id);
    
    user.refreshToken = refreshToken;
    await user.save();
    setCookies(res, accessToken, refreshToken);
    res.status(201).json({ userId: user._id, email: user.email, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Error registering user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
   

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const { refreshToken, accessToken } = generateTokens(user._id);
    user.refreshToken = refreshToken;
    await user.save();
    setCookies(res, accessToken, refreshToken);
    res.status(200).json({userId: user._id, message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ error:error.message || "Error logging in" });
  }
};
export const logoutUser=async (req,res)=>{
  try {
      const refreshToken=req.cookies.refreshToken;
      if(refreshToken){
          const decodedUser=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
          const user=await User.findById(decodedUser.userid);
          user.refreshToken="";
          await user.save();
          res.clearCookie('accessToken');
          res.clearCookie('refreshToken');
          return res.status(200).json("Logged Out successfully");
  
  
      }
      else{
          return res.status(400).json({
              message:"No refreshTokenFound"
          })
  
      }
  } catch (error) {
      
      return res.status(500).json({
          message: error.message
      })
      
  }
}

export const getProfile=(req,res)=>{
  try {
    const user=req.user;
    if(!user){
        return res.status(500).json({
            message: "No user found"

        })
    }
    return res.status(200).json(user)
  } catch (error) {
   
   return res.status(500).json({message: error.message})
   
  }
}

