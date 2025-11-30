//POST request: create a new user
import express from "express"
import fs from "fs"

const app=express();

//middleware to parse json ad URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

function getUsers(){
    return JSON.parse (fs.readFileSync('./users.json' ,'utf-8'));
}

function saveUsers(users){
    fs.writeFileSync('./users.json' .JSON.stringify(users,null,2));
}