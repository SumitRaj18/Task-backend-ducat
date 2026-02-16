const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // New field to store the path to the uploaded file
    image: {
        type: String, 
        required: false // Set to true if every post MUST have an image
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
}, {
    timestamps: true
});

const Post = mongoose.model("posts", PostSchema);

module.exports = { Post };