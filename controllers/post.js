import { Post } from "../models/post.js";

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        
        // Check if file exists
        const imagePath = req.file ? req.file.filename : null;

        const newPost = await Post.create({
            title,
            content,
            image: imagePath, // Save the filename to your DB
            createdBy: req.user._id // Provided by your auth middleware
        });

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const AllPosts= async (req,res) => {
    const posts = await Post.find({});
    if (!posts) {
        return res.status(500).json({
            msg:"No Posts Found"
        })
    }
    return res.status(200).json({
        success:true,
        msg:"Fetched All posts",
        posts:posts
    })
}

export const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('createdBy', 'name');
        if (!post) return res.status(404).json({ msg: "Post not found" });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};