import { Post } from "../models/post.js";

export const createPost = async (req, res) => {
    try {
        const { title, description } = req.body;

        const userId = req.user?._id || req.user?.id; 

        if (!userId) {
            return res.status(401).json({
                success: false,
                msg: "Unauthorized: User ID not found in request"
            });
        }

        const post = await Post.create({
            title,
            description,
            createdBy: userId, // ✅ This satisfies the Mongoose requirement
            image: req.file ? req.file.path : null // If you're handling the image upload here
        });

        return res.status(201).json({
            success: true,
            msg: "Post Created Successfully",
            post // It's good practice to return the created post
        });

    } catch (error) {
        // 3. Catch validation or server errors
        return res.status(500).json({
            success: false,
            msg: error.message || "Internal Server Error"
        });
    }
}
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