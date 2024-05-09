import jwt from "jsonwebtoken"
import User from "../models/user-model.js"

const authMiddleware= async (req,res,next)=>{
    const token=req.header('Authorization');

    if(!token){
        return res
        .status(401)
        .json({message:"Unauthorized HTTP,Token not provided"});
    }
    try{
        const isVerified = jwt.verify(token,process.env.JWT_AUTH_SECRET);
        
        const userData=await User.findOne({email:isVerified.email});
        // console.log(userData);

        req.user=userData;
        req.token=token;
        req.userId=userData._id;
        next();
    }
    catch(err){
        return res.status(401).json({message:"Invalid Token"})
    }

    

}
export default authMiddleware; 