//POST request: create a new user
import express from "express"
import fs from "fs"
const app=express();

//middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

function getUsers(){
    return JSON.parse (fs.readFileSync('./user.json' ,'utf-8'));
}

function saveUsers(users){
    fs.writeFileSync('./users.json',JSON.stringify(users,null,2));
}

//Serve HTML form directly in this file
app.get('/adduser',(req,res)=>{
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>submit user info</h1>
            <form id=""userForm" method="POST" action ="/api/users">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required ><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required ><br>
            <button type="submit">Submit</button>
    
        </body>
        </html>
        `);
});

//POST request to receive and save form data

app.post('/api/users',(req,res)=>{
    const users=getUsers();
    const newUser={
        id:users.length+1,
        name:req.body.name,
        email:req.body.email,
    };
    users.push(newUser);
    saveUsers(users);
    res.status(201).send('User added successfully');
});


app.get('/viewUsers',(req,res)=>{
    res.send(fs.readFileSync('./users.json' ,'utf-8'));

})

app.listen(5000,()=>{
    console.log("Server running on http://localhost:5000");
});
