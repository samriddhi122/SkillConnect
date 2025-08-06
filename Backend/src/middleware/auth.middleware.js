import jwt from "jsonwebtoken";
import { User } from "../model/user.model";

const verifyJWT=async(req,res,next)=>{
    try{
        const userToken=req.cookies?.token;
    if(!userToken){
        return res.status(401).json({message:"Unauthorized"});
    }
    const decodedToken=jwt.verify(userToken,process.env.jwtSecret);
    const user=await User.findById(decodedToken.id).select("-password");
    if(!user){
        return res.status(401).json({message:"Unauthorized"});
    }req.user = user;
    next()
    }
    catch (error) {
    throw new Error(error?.message || "Invalid access token")
}

}
export {verifyJWT};