import exp from 'express';
import {connect} from 'mongoose';
import {config} from 'dotenv';
import { userRoute } from './APIs/UserAPI.js';
import { adminRoute}  from './APIs/AdminAPI.js';
import { authorRoute} from './APIs/AuthorAPI.js';
import cookieParser from 'cookie-parser';
import { commonRoute } from './APIs/CommonAPI.js';
config()//process .env
const app=exp();
//add body parser middleware
app.use(exp.json())
//connect to db
const connectDB=async()=>{
    try{
    await connect(process.env.DB_URL)
    console.log("connected to database successfully");
    app.listen(process.env.PORT,()=>console.log("HTTP server listening at port"));
    }catch(err){
        console.log("database not connected");
    }
}
connectDB();

//add cookie parser middleware
app.use(cookieParser())
app.use('/user-api',userRoute);
app.use('/admin-api',adminRoute);
app.use('/author-api',authorRoute);
app.use('/common-api',commonRoute);
//Invalid path
app.use((req,res,next)=>{
    res.json({message:`${req.url}  is Invalid path`});
});
//error handling middleware (if next is not given express not consider it as a middleware)
app.use((err,req,res,next)=>{
    console.log("err:",err)
    res.json({message:"error",reason:err.message})
})

