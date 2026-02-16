import { Post } from "../models/post.js";

export const createPost = async (req, res) => {
    try {
        // Change 'content' to 'description' here
        const { title, description } = req.body; 
        
        const imagePath = req.file ? req.file.filename : null;

        const newPost = await Post.create({
            title,
            description, // Ensure this matches your Mongoose Schema field name
            image: imagePath,
            createdBy: req.user._id 
        });

        res.status(201).json(newPost);
    } catch (error) {
        // This will now catch the validation error properly if things go wrong
        res.status(400).json({ error: error.message });
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