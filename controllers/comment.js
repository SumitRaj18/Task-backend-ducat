const Comments = require('../models/comment.js');

const AddComment = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, msg: "Unauthorized" });
    }

    try {
        const blog = req.params.id; // Correctly getting ID from URL
        const { comment } = req.body;
        const user = req.user._id;

        const result = await Comments.create({
            comment,
            commentedBy: user,
            blog
        });

        // Use .json() for better frontend compatibility
        return res.status(201).json({ 
            success: true, 
            msg: "Comment Added", 
            result 
        });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
};

const ShowComments = async (req, res) => {
    const id= req.params.id
    try {
        const comments = await Comments.find({blog:id})
            .populate('commentedBy','name')
            .sort({ createdAt: -1 }); 

        if (comments.length === 0) {
            return res.status(200).json([]);
        }

        return res.status(200).json(comments);

    } catch (error) {
        console.error("Error showing comments:", error);
        return res.status(500).send("Internal Server Error while fetching comments.");
    }
}
module.exports={AddComment,ShowComments}