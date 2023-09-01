import mongoose from "mongoose";
import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "user",
        select: "fullName email avatarUrl",
      })
      .exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Unable to get posts",
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!mongoose.isValidObjectId(postId)) {
      return res.status(404).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    const post = await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        new: true,
      }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json(post);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to get post",
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, text, imageUrl, tags } = req.body;

    const doc = new Post({
      title,
      text,
      imageUrl,
      tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to create the post. Please, try again later",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!mongoose.isValidObjectId(postId)) {
      return res.status(404).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    const post = await Post.findOneAndDelete({
      _id: postId,
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json({
      success: true,
      message: "Post has been deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to delete post",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, text, imageUrl, tags } = req.body;

    if (!mongoose.isValidObjectId(postId)) {
      return res.status(404).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    const post = await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        title,
        text,
        imageUrl,
        user: req.userId,
        tags,
      }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json({
      success: true,
      message: "Post has been updated",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to update post",
    });
  }
};
