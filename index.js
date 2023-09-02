import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import {
  registerValidator,
  loginValidator,
  postCreateValidator,
  postUpdateValidator,
} from "./validators/index.js";

import {
  login,
  profile,
  register,
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
  getRecentTags
} from "./controllers/index.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:Sasna7788@cluster0.piksmqh.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Ok");
  })
  .catch((err) => console.log("DB Error: ", err));

const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/auth/login", loginValidator, handleValidationErrors, login);
app.post("/auth/register", registerValidator, handleValidationErrors, register);
app.get("/auth/profile", checkAuth, profile);

app.get("/posts", getAllPosts);
app.get("/posts/:id", getPost);
app.post(
  "/posts",
  checkAuth,
  postCreateValidator,
  handleValidationErrors,
  createPost
);
app.delete("/posts/:id", checkAuth, deletePost);
app.patch(
  "/posts/:id",
  checkAuth,
  postUpdateValidator,
  handleValidationErrors,
  updatePost
);

app.get("/tags", getRecentTags);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
