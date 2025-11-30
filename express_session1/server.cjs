//import express library
const express=require('express');

//create an express application
const app= express();

//define a GET route for the root url
app.get('/user',(req,res)=>{
    res.send('hello world , this is user page ');
});

app.get('/',(req,res)=>{
    res.send('hello world, this is homepage');
});

//start the server and listen on port 3000
app.listen(3001, ()=>{     
    
    console.log('Server is running on http://localhost:3001');
});