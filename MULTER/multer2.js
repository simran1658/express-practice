//for multiple files
import express from "express"
import multer from "multer"
import path from "path"

const app=express();
const PORT=3000;

const storage=multer.diskStorage({
    destination:'./uploads',
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now() +path.extname(file.originalname) )
    }
});

const upload=multer({storage:storage});

//serve html form for file upload
app.get('/' ,(req,res)=>{
    res.send(`
        <h2>Upload multiple files<h2>
        <form action="/upload-multiple" method="POST" enctype="multipart/form-data">
        <input type="file" name="files" multiple>
        <button type="submit">Upload</button>
        </form>
        `);
    });

//handle file upload
app.post('/upload-multiple',upload.array('files',3),(req,res)=>{
    res.send(`File uploaded successfully'):${req.files.map(file=>file.filename).join(',')}`);
});

app.listen(PORT,()=>{
    console.log("Server running on http://localhost:3000");
});