import express from "express";
import router from "./routers/auth-router.js";
import connectDB from "../utils/db.js";
import cors from "cors";
import adminRoute from "./routers/admin-router.js"
import Post from "./models/post-model.js";
const app = express();

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
  };
  
  app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth", router);
app.use("/api/admin", adminRoute);

app.get('/api/public/posts',async (req, res) => {
    try {
        const posts = await Post.find({}).sort({createdAt:-1});
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "No post" });
        }
        return res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
    res.json(data);
});

app.get('/viewPost/:id', async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findOne({ _id: postId });
        if (!post) {
            return res.status(404).json({ message: "No post found" });
        }
        return res.status(200).json(post);
    } catch (error) {
        next(error);
    }
});


const PORT = 3000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
});
