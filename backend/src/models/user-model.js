import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    gender:{
        type:String,
    }
    ,
    role:{
        type:String,
        default:"User"
    },
},
{
    timestamps:true
}
);


//secure password
userSchema.pre('save',async function(next){
    const user=this;
    if(!user.isModified('password')){
        next();
    }
    try{
        const saltRound= await bcrypt.genSalt(10);
        const hash_password=await bcrypt.hash(user.password,saltRound);
        user.password=hash_password;
    }   
    catch(error){
        next(error);
    }
})

//JSON WEB TOKEN

userSchema.methods.generateToken = function(){
    try{
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            role:this.role,
        },
        process.env.JWT_AUTH_SECRET,
        {expiresIn:"1d"}
        )
    }
    catch(error){
        console.error(error);
    }
};


//define the model or collection

const User = new mongoose.model('User',userSchema);

export default User;