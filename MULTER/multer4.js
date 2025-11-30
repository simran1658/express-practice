
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

// Ensure upload directories exist
const imageDir = "./uploads/images/";
const docDir = "./uploads/docs/";

fs.mkdirSync(imageDir, { recursive: true });
fs.mkdirSync(docDir, { recursive: true });

// Configure storage dynamically based on file type
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, imageDir);
        } else if (file.mimetype.startsWith("application/")) {
            cb(null, docDir);
        } else {
            cb(new Error("Unsupported file type!"), null);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve HTML form for file upload
app.get("/", (req, res) => {
    res.send(`
        <h2>Upload a file</h2>
        <form action="/upload-file" method="POST" enctype="multipart/form-data">
            <input type="file" name="file" required>
            <button type="submit">Upload</button>
        </form>
    `);
});

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Handle file upload
app.post("/upload-file", upload.single("file"), (req, res) => {
    res.send(`File uploaded to appropriate folder: ${req.file.path}`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
