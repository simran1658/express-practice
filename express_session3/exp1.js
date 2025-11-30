import express from "express"
import fs from "fs"
const app=express();

//read user.json
function getUsers(){
    return JSON.parse(fs.readFileSync('./users.json','utf-8'));
}

app.get('/api/users',(req,res)=>{
    const users=getUsers();
    res.json(users);
});

app.listen(3000,()=>{
    console.log("hehe");
});