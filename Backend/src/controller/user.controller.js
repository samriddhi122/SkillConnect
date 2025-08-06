import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";

const registerUser=async(req,res)=>{
    try{
        const {username,email,fullName,password}=req.body;
         if (
            [fullName,username,email,password].some((feild)=>feild?.trim() === "")
         ){
            return res.status(400).json({message: "All feilds are required"});
         }
         const userExisted=await User.findOne({$or:[{username},{email}]});
         if(userExisted){
            throw new Error("User already existed");
         }
         User.create({
            username,
            email,
            password : await bcrypt.hash(password,10),
            fullName
         })
         return res.status(201).json({message: "User created successfully"});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}
const loginUser=async(req,res)=>{
   try{
      const {email,password}=req.body;
      if ( !email) {
         throw new Error("username or email is required")
     }
      const user=await User.findOne({email});
      if (!user) {
         throw new Error( "User does not exist")
     }
     const isPasswordCorrect=await user.isPasswordCorrect(password);
       if(!isPasswordCorrect){
          throw new Error("Invalid credentials");
       }
      const token=await user.generateToken(user._id);
      const options = {
         httpOnly: true,
         secure: true
     }
     return res.status(200)
     .cookie("token",token,options)
     .json(
      {message:"User logged in successfully"}
     )

   }
   catch(err){
      return res.status(500).json({message:err.message});
  }
}
export {registerUser,loginUser};