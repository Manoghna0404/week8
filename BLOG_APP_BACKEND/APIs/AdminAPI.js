import exp from 'express'
import { UserTypeModel } from '../models/UserModel.js';
//mini router
export const adminRoute=exp.Router();

//read all articles(optional)

//block user
adminRoute.get('/block/:uid',async(req,res)=>{
    //read id from url
    let uid=req.params.uid;
    //check whether that user is active or not
    let userExist=await UserTypeModel.findOne({_id:uid,isActive:true})
    console.log(uid)
    if(!userExist)
        return res.status(401).json({message:"user not exists"});
    //block the user
    let blockUser=await UserTypeModel.findByIdAndUpdate(uid,{$set:{isActive:false}});
    //console.log(blockUser)
    res.status(200).json({message:"user blocked just contact the admin ",payload:blockUser});
})
//unblock user
adminRoute.get('/unblock/:uid',async(req,res)=>{
    //read id from url
    let uid=req.params.uid;
    //check whether that user is active or not
    let userExist=await UserTypeModel.findOne({_id:uid,isActive:false})
    if(!userExist)
        return res.status(401).json({message:"user is not blocked"});
    //block the user
    let UnblockUser=await UserTypeModel.findByIdAndUpdate(uid,{$set:{isActive:true}});
    res.status(200).json({message:"user unblocked",payload:UnblockUser});
})