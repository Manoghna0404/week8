import exp from 'express';
import { authenticate } from '../services/authServices.js';
import { UserTypeModel } from '../models/UserModel.js';
import bcrypt from 'bcryptjs'
export const commonRoute=exp.Router();

//login
commonRoute.get("/login",async(req,res)=>{
//get user cred obj
    let userCred=req.body;
    //call authenticate service
    let {token,user}=await authenticate(userCred)
    //save token as httpOnly cookie
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    });
    //send res
    res.status(201).json({message:"login success",payload:user})
})
//logout
commonRoute.get("/logout",async(req,res)=>{
     //clear the cookie named 'token
    res.clearCookie('token',{
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    });
    res.status(200).json({message:"Logged out successfully"})
})
//change the password
commonRoute.put('/change-password',async(req,res)=>{
    //get current password and new password
    let {email,password,newPassword}=req.body;
    //check the current password is correct
    const user=await UserTypeModel.findOne({email});
    if(!user)
        return res.status(401).json({message:"email not found"});
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch)
        return res.status(401).json({message:"passwords doesnot match"})
    //replace current password with new password
    let hashedPassword=await bcrypt.hash(newPassword,10)
     user.password=hashedPassword
     user.save();
    //send res
    res.status(200).json({message:"password changed",payload:user})
})