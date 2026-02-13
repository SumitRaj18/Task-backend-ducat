const jwt = require("jsonwebtoken");

const restrictToLoggedinUserOnly = async (req, res, next) => {
    // 1. Get the token from the Authorization header
    // Header format: "Bearer <token>"
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: "Access Denied: No Token Provided" });
    }

    try {
        // 2. Verify the token using your Secret Key
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        
        // 3. Attach the user data to the request object
        req.user = decode;
        
        // 4. Move to the next function (the actual controller)
        next();
    } catch (err) {
        return res.status(403).json({ msg: "Invalid or Expired Token" });
    }
};

module.exports = { restrictToLoggedinUserOnly };