//create HTTP server
import exp from 'express'
import {connect} from 'mongoose'
import { config } from 'dotenv'
import { UserApp } from './API/UserAPI.js'
import cors from 'cors'
config()
//add body parser middleware
const app=exp()
app.use(cors({
    origin:['http://localhost:5173']
}))
app.use(exp.json())
//forward req to UserAPI 
app.use("/user-api",UserApp)
//connect to DB
async function connectDB(){
    try{
        await connect(process.env.DB_URL)
        console.log("connected to DB")
        //assign port number
        const port=process.env.PORT;
        app.listen(port,()=>console.log("HTTP server is listening at port"))
    }catch(err){
        console.log("error in DB")
    }
}
connectDB()
// Add error handling middleware
app.use((err, req, res, next) => {

  console.log("err is ",err)
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
  });
});