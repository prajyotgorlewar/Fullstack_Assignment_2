import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const postSchema=new mongoose.Schema({

    userId:{
        type:String,
    },
    author:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    detail:{
        type:String,
        require:true
    },

},
{
    timestamps:true
}
);


postSchema.methods.generateToken = function(){
    try{
        return jwt.sign({
            postId:this._id.toString(),
            author:this.author,
            title:this.title,
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

const Post = new mongoose.model('Post',postSchema);

export default Post;