import {model,Schema} from 'mongoose'
//create user schema with validations
const UserSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already existed"]
    },
    dateOfBirth:{
        type:Date,
        required:[true,"date of birth is required"]
    },
    mobileNumber:{
        type:Number
    },
    status:{
        type:Boolean,
        default:true
    }
},
    {
        strict:"throw",
        timestamps:true,
        versionKey:false
    },
)
//create user model for user schema
export const UserModel=model("userDB",UserSchema)