const adminMiddleware= async(req,res,next)=>{
    try {
        console.log(req.user);
        const adminRole=(req.user.role=="Admin");
        if(!adminRole){
            return res.status(403)
            .json({message:"Access Denied.User is not admin"})
        }
        // res.status(200).json({msg:req.user.role});
        next();
        
    } catch (error) {
        next(error)
    }
}

export default adminMiddleware;