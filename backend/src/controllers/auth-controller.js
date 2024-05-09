import Post from "../models/post-model.js";
import User from "../models/user-model.js";
import bcrypt from "bcryptjs"
const home= async(req,res)=>{
    try{
        const posts = await Post.find({});
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No post" });
        }
        return res.status(200).json(posts);
    }
    catch(error){
        res.status(400).send({msg:"Page not found"})
    }
};



const register= async(req,res)=>{
    try{
        const {name,email,password,role,gender}=req.body;
        const userExist= await User.findOne({email:email});

        if(userExist){
            return res.status(400).json({msg:"Email already in use"});
        }

        const saltRound =10;
        const hash_password= await bcrypt.hash(password,saltRound);

       const UserCreated = await User.create({name,email,password,role,gender})
       res.status(201)
       .json({msg:"Registration Successful",
        token: await UserCreated.generateToken(),
        userId:UserCreated._id.toString()
    });

    }
    catch(error){
        res.status(500).json("internal server error")
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, userExist.password);

        if (isPasswordValid) {
                res.status(200).json({
                    msg: "Login Successful!",
                    token: await userExist.generateToken(),
                    userId: userExist._id.toString()
                });
        } else {
            res.status(401).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

//User Logic to send user data

const user = async(req,res)=>{
    try{
        const userData = req.user;
        return res.status(200).json({userData})

    }catch(err){
        console.log("Error ",err);
    }
}




const authcontrollers={ home, register,login,user } 
export default authcontrollers ;