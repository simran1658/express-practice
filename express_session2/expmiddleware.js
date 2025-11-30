import express from 'express'
const app=express();

//custom middleware function
app.use((req,res,next)=>{
    console.log(`${req.method} request for ${req.url}`);
    next();
});

//routes
app.get('/',(req,res)=>{
    res.send("heloooooo");
});
app.get('/user',(req,res)=>{
    res.send("hiiii , this is user page");
});
app.listen(8000,()=>{
    console.log("code is running");
});
