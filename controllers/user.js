const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const JWT_SECRET = process.env.SECRET_KEY; // Keep this in .env!

const userSignup = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    
    if (!user) {
        return res.status(500).json({ msg: "Error creating user" });
    }
    return res.status(201).json({ msg: "User Created Successfully" });
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email, password });
    
    if (!user) {
        return res.status(401).json({ msg: "Invalid email or password" });
    }

   
    const token = jwt.sign(
        { id: user._id, email: user.email }, 
        JWT_SECRET, 
        { expiresIn: "1h" }
    );

    return res.status(200).json({ 
        msg: "User Logged in Successfully",
        token: token ,
        user: user
    });
};

module.exports = { userSignup, userLogin };