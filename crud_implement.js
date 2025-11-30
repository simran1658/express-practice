import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utility functions
function getUsers() {
  return JSON.parse(fs.readFileSync("./users.json", "utf-8"));
}

function saveUsers(users) {
  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
}

// -------------------- Routes --------------------

// Get all users
app.get("/users", (req, res) => {
  const users = getUsers();
  res.json(users);
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const users = getUsers();
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// Create new user
app.post("/users", (req, res) => {
  const users = getUsers();
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  saveUsers(users);
  res.status(201).json(newUser);
});

// Update user by ID
app.put("/users/:id", (req, res) => {
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[userIndex] = { ...users[userIndex], ...req.body };
  saveUsers(users);
  res.json(users[userIndex]);
});

// Delete user by ID
app.delete("/users/:id", (req, res) => {
  let users = getUsers();
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(userIndex, 1);
  saveUsers(users);
  res.json({ message: "User deleted", deletedUser });
});

// -------------------- Start Server --------------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
