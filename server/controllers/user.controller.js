import isAuthenticated from "../middleware/isAuthentication.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signUp = async (req,res) => {
    
    try {
        const {name,email,password,role} = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message:"All fields are required",
                success:false
            })
        }
        const user = await User.findOne({
            email:email,
            role:role
        });
        if (user) {
            return res.status(400).json({
                message:"User is already registered with this email",
                success:false
            })
        };
        await User.create({
            name,
            email,
            password,
            role
        });
        return res.status(201).json({
            message:"User registered successfully",
            success:true
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const login = async (req,res) => {
    
    try {
        const {email,password,role} = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message:"All fields are required",
                success:false
            })
        };
        let user = await User.findOne({
            email:email,
            role:role
        });
        if (!user) {
            return res.status(400).json({
                message:"user email and password is wrong.",
                success:false
            })
        };
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect password.",
                success: false
            });
        }
        const tokenData = {
            id: user._id,
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{
            expiresIn: "2d"
        });

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
          return res.status(200).cookie("token",token,{
            httpOnly:true,
            maxAge: 2 * 24 * 60 * 60 * 1000,
            sameSite:"strict",
        }).json({
            message:`welcome back ${user.name}`,
            success:true,
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
        
    }
}

export const logout = async (req,res) => {
    try {
        return res.status(200).cookie("token","",{maxAge: 0}).json({
            message:"Logout successfully",
            success:true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
        
    }
}
export const getUserProfile = async (req, res) => {
  try {

    

    
    const user = await User.findById(req.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User profile fetched successfully",
      success: true,
      user: user.name,
    });
  } catch (error) {
    console.log("Error fetching user profile:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

