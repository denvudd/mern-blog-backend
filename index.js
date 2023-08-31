import express from "express";
import mongoose from "mongoose";
import { registerValidator } from "./validators/auth.js";
import checkAuth from "./utils/checkAuth.js";
import { login, profile, register } from "./controllers/UserController.js";

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

app.post("/auth/login", login);

app.post("/auth/register", registerValidator, register);

app.get("/auth/profile", checkAuth, profile);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
