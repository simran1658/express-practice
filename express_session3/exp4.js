import express from 'express';
import fs from 'fs';
const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

function getUsers(){
    return JSON.parse(fs.readFileSync('./users.json','utf-8')); 
}

function saveUsers(users){
    fs.writeFileSync('./users.json',JSON.stringify(users,null,2));
} 

app.get('/update/:id',(req,res)=>{
    const users=getUsers();
    const userid=parseInt(req.params.id);
    const user=users.find(u=> u.id == userid);

    if(user){
        res.send(`
            <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>User Form</title>
        </head>
        <body>
            <h1> Submit user</h1>
            <form id="userform" method="post" action="/api/users/${userid}">
            <label for="name"> Name:</label>
            <input type="text" id="name" name= "name" value="${user.name}" required> <br> 
            <label for="email"> Email:</label>
            <input type="email" id="email" name= "email" value="${user.email}" required> <br> 
            <button type="submit">Submit</button>
            </form>
        </body>
        </html>
        `);
    }

    else{
        res.status(404).send("User not found");
    }
});

app.post('/api/users/:id',(req,res)=>{
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id == req.params.id);

    if(userIndex!==-1){
        //upadte the user data with the form input
        users[userIndex]={...users[userIndex],...req.body};

        //save the updated users list back to the file
        saveUsers(users);

        //send a success response
        res.send(`
                <html>
                <body>
                <h1>user Updated Successfully</h1>
                <p>Updated User Details</p>
                <p>Name: ${users[userIndex].name}</p> 
                <p>Email: ${users[userIndex].email}</p>
                <a href="/update/${users[userIndex].id}">Update another user<a/>
                </body>
                </html>
            `);
    }
    else{
        res.status(404).send("user not found");
    }
});

//start the server

app.listen(3000,()=> console.log("server running on http://localhost:3000"));