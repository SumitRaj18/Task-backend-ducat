const express = require("express");
const cors = require('cors')
const { default: mongoose } = require("mongoose");
const { userSignup, userLogin } = require("./controllers/user.js");
const { createPost, AllPosts, getSinglePost } = require("./controllers/post.js");
const path = require("path"); // Added
const upload = require("./middleware/multer");
const { AddComment, ShowComments } = require("./controllers/comment.js");
const { restrictToLoggedinUserOnly } = require("./middleware/auth.js");
const app = express();


mongoose.connect("mongodb+srv://Sumit:Sumit8076@cluster0.eqya0hv.mongodb.net/Assignment").then
(()=>console.log("MongoDB Connected")).catch
((err)=>console.log(err));


app.use(express.json());
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post("/api/createpost", restrictToLoggedinUserOnly , upload.single('image'), createPost);

app.post("/api/signup",userSignup);
app.post("/api/login",userLogin);
app.get("/api/allpost",AllPosts)

app.post("/api/comment/:id", restrictToLoggedinUserOnly, AddComment);

app.get("/api/comment/:id", ShowComments);
app.get("/api/allusersblogs/:id", getSinglePost);
app.listen(8001,()=>{
    console.log('Server is running')
})