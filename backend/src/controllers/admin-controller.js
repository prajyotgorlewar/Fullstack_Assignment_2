import Post from "../models/post-model.js";
import User from "../models/user-model.js";

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 }).sort({createdAt:-1});
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "User deleted Successfully!" });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const fetchedUserData = await User.findOne({ _id: id }, { password: 0 });
        return res.status(200).json(fetchedUserData);
    } catch (error) {
        next(error);
    }
};

const updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedData = await User.updateOne({ _id: id }, { $set: updatedUserData });
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
};

const addPost = async (req, res, next) => {
    try {
        console.log(req.body);
        const { userId, author, title, detail } = req.body;
        const PostCreated = await Post.create({ userId, author, title, detail });
        res.status(201).json({
            msg: "Posted Successful",
            token: await PostCreated.generateToken(),
            postId: PostCreated._id.toString()
        });
    } catch (error) {
        res.status(500).json("internal server error");
    }
};

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 }); 
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No post" });
        }
        return res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};


const getPostById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const fetchedPostData = await Post.findOne({ _id: id });
        return res.status(200).json(fetchedPostData);
    } catch (error) {
        next(error);
    }
};

const updatePostById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedPostData = req.body;
        const updatedData = await Post.updateOne({ _id: id }, { $set: updatedPostData });
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
};

const deletePostById = async (req, res, next) => {
    try {
        const id=req.params.id;
        await Post.deleteOne({ _id: id });
        return res.status(200).json({ message: "Post deleted Successfully!" });
        
    } catch (error) {
        next(error)
    }
};

const adminController = {
    getAllPosts,
    getAllUsers,
    getPostById,
    getUserById,
    deletePostById,
    deleteUserById,
    updatePostById,
    updateUserById,
    addPost
};

export default adminController;
