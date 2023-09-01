import express from "express";
import mongoose from "mongoose";
import { registerValidator, loginValidator } from "./validators/auth.js";
import checkAuth from "./utils/checkAuth.js";
import { login, profile, register } from "./controllers/UserController.js";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "./controllers/PostController.js";
import { postCreateValidator } from "./validators/post.js";

mongoose
  .connect(
    "mongodb+srv://admin:Sasna7788@cluster0.piksmqh.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Ok");
  })
  .catch((err) => console.log("DB Error: ", err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/auth/login", loginValidator, login);
app.post("/auth/register", registerValidator, register);
app.get("/auth/profile", checkAuth, profile);

app.get("/posts", getAllPosts);
app.get("/posts/:id", getPost);
app.post("/posts", checkAuth, postCreateValidator, createPost);
app.delete("/posts/:id", checkAuth, deletePost);
app.patch("/posts/:id", checkAuth, updatePost);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
