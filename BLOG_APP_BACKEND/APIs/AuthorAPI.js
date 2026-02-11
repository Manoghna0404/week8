import exp from 'express'
import {register,authenticate} from '../services/authServices.js'
import { UserTypeModel } from '../models/UserModel.js';
import { ArticleModel } from '../models/ArticleModel.js';
import {checkAuthor} from '../middlewares/checkAuthor.js';
import { verifyToken } from '../middlewares/verifyToken.js';
//mini router
export const authorRoute=exp.Router();

//register author
authorRoute.post('/users',async(req,res)=>{
    //get user obj from req
    let userObj=req.body;
    //call register
    const newUserObj=await register({...userObj,role:"AUTHOR"});
    res.status(201).json({message:"author created",payload:newUserObj})
})
//create article(protected)
authorRoute.post('/articles',verifyToken,checkAuthor,async(req,res)=>{
    //get article from request
    let newArticle=req.body;
    //check for the author
    // const author=await UserTypeModel.findById(newArticle.author)
    // if(!author || author.role!=="AUTHOR")
    //     return res.status(401).json({message:"Invalid author"});
    //create article doucment
    let newArticleDoc=new ArticleModel(newArticle)
    //save
    let createdArticleDoc=await newArticleDoc.save();
    //send res
    res.status(201).json({message:"article created",payload:createdArticleDoc})
});
//read article of author(protected)
authorRoute.get('/articles/:authorId',verifyToken,async(req,res)=>{
    //get author id
    let aid=req.params.authorId;
    //check the author
    const author=await UserTypeModel.findById(aid)
    if(!author || author.role!=="AUTHOR")
        return res.status(401).json({message:"Invalid author"});
    //read articles by this author
    let allArticles=await ArticleModel.find({author:aid,isArticleActive:true}).populate("author","firstName email")
    //send res
    res.status(201).json({message:"all articles",payload:allArticles})
})
//edit article(protected)
authorRoute.put('/articles',verifyToken,async(req,res)=>{
    //get modified article from req
    let {articleId,title,category,content,author}=req.body;
    //find article
    let checkArticle=await ArticleModel.findOne({_id:articleId,author:author});
    if(!checkArticle)
        return res.status(401).json({message:"article not found"});
    //update the article
    let updateArticle=await ArticleModel.findByIdAndUpdate(articleId,{$set:{title,category,content}},{new:true})
    res.status(201).json({message:"article updated",payload:updateArticle})

})
//delete(soft delete) article   
authorRoute.delete('/:aid/articleId/:arId',async(req,res)=>{
    //get the article from url
    let {aid,arId}=req.params;
    //check whether that article exists or not
    let articleExits=await ArticleModel.findOne({_id:arId,author:aid,isArticleActive:true});
    if(!articleExits)
        return res.status(401).json({message:"article not found"});
    //delete the article
    let deletedArticle=await ArticleModel.findByIdAndDelete(arId);
    //send the res
    res.status(200).json({message:"Article deleted successfully",payload:deletedArticle})
})