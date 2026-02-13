const multer = require('multer');
const path = require('path');

// Configure where and how files are saved
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Make sure this folder exists!
    },
    filename: function (req, file, cb) {
        // Create a unique filename: timestamp + original name
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

// Optional: Filter to only allow images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
    fileFilter: fileFilter
});

module.exports = upload;