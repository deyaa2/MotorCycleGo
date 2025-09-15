const multer = require('multer');
const path = require('path');
const fs = require('fs');

let uploadPath;

try {
  // Define absolute path to the uploads folder at project root
  uploadPath = path.join(__dirname, '../../uploads');

  // Ensure the folder exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log("✅ Upload folder created at:", uploadPath);
  } else {
    console.log("📁 Upload folder already exists:", uploadPath);
  }
} catch (err) {
  console.error("❌ Error setting up upload folder:", err);
  uploadPath = path.join(__dirname); // fallback to current directory
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      cb(null, uploadPath);
    } catch (err) {
      console.error("❌ Error in destination callback:", err);
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    try {
      const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, unique + path.extname(file.originalname));
    } catch (err) {
      console.error("❌ Error in filename callback:", err);
      cb(err);
    }
  }
});

module.exports = multer({ storage });
