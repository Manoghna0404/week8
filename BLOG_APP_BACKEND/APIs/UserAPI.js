import exp from 'express'
import {register,authenticate} from '../services/authServices.js'
import { checkAuthor } from '../middlewares/checkAuthor.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { UserTypeModel } from '../models/UserModel.js';
import { ArticleModel } from '../models/ArticleModel.js';
//mini router
export const userRoute=exp.Router();

//register user
userRoute.post('/users',async(req,res)=>{
    //get user obj from req
    let userObj=req.body;
    //call register
    const newUserObj=await register({...userObj,role:"USER"});
    res.status(201).json({message:"user created",payload:newUserObj})
})

//read all articles 
userRoute.get('/articles',async(req,res)=>{
    //get articles from api
    let articleInfo=req.params;
    //get all the author articles
    let articles=await ArticleModel.find();
    //send res
    res.status(200).json({message:"all articles",payload:articles});
})
//add comments to articles
 userRoute.put('add/:uid/articleId/:arId',async(req,res)=>{
    let {uid,arId}=req.body;
    //check whether that user exist or not
    let userExist=await UserTypeModel.findOne({_id:uid,isActive:true});
    if(!userExist)
       return res.status(401).json({message:"user not found"})
    //add comments
    let addComment=await ArticleModel.findByIdAndUpdate(arId,{$push:{comments:{comment:"Inspirational Article"}}},{new:true})
    if (!addComment)
      return res.status(404).json({ message: "Article not found" });
    //send the res
    res.status(200).json({message:"comment added to article successfully",payload:addComment});
 })

