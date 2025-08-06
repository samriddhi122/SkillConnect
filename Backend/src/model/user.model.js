import { Schema } from "mongoose";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
    },
    {
        timestamps: true
    }
)
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateToken=function(){
    return jwt.sign({
        id: this._id,
        username: this.username,
        fullName: this.fullName,
    },
    process.env.jwtSecret,
    {
        expiresIn:process.env.jwtExpire
    }

    )
}
export const User=mongoose.model("User",userSchema);