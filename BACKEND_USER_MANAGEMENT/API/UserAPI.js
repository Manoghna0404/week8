import { Router } from "express";
import exp from "express"
import { UserModel } from "../Models/UserModel.js";
//create mini-express app
export const UserApp=exp.Router()
//USER API ROUTES
//create user 
UserApp.post('/users',async(req,res)=>{
    //get new user
    const newUser=req.body;
    //create user document
    const newUserDocument=new UserModel(newUser)
    //save the document
    let user=newUserDocument.save()
    //send the res
    res.status(200).json({mesage:"user created",payload:user})
})
//Read all users
UserApp.get('/users',async(req,res)=>{
    //find the user
    let usersList=await UserModel.find({status:true})
    
    //send the res
    res.status(200).json({message:"all users",payload:usersList})
})
//Read a user By id
UserApp.get('/users/:id',async(req,res)=>{
    //get the request
    let userId=req.params.id;
    //find the user by id
    let user=await UserModel.findOne({_id:userId,status:true});
    if(!user)
        return res.status(404).json({message:"user not found"})
    //send the res
    res.status(200).json({message:"user found with given id",payload:user}) 
})
//Delete a user by id
UserApp.delete('/users/:id',async(req,res)=>{
    //get the request from body
    let user=req.params.id;
    //find the user
    let deleteUser=await UserModel.findByIdAndUpdate(user,{$set:{status:false}},{new:true})
    if(!deleteUser)
        res.status(404).json({message:"user not found"})
    //send the res
    res.status(200).json({message:"user modified",payload:deleteUser})
})

//active User(change status to true)
UserApp.patch("/users/:id",async(req,res)=>{
    //get the id from url
    let user=req.params.id;
    //find the user and change the status to false
    let modifyUser=await UserModel.findByIdAndUpdate(user,{$set:{status:true}},{new:true})
    //send the res
    res.status(200).json({message:"user activated",payload:modifyUser})
})