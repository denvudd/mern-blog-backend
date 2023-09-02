import { body } from "express-validator";

export const postCreateValidator = [
  body("title", "Title is required").isLength({ min: 3 }).isString(),
  body("text", "Text is required").isLength({ min: 1 }).isString(),
  body("tags", "Invalid tags format").optional().isString(),
  body("imageUrl", "Invalid link format").optional().isString(),
];

export const postUpdateValidator = [
  body("title", "Title is required").isLength({ min: 3 }).isString(),
  body("text", "Text is required").isLength({ min: 1 }).isString(),
  body("tags", "Invalid tags format").optional().isString(),
  body("imageUrl", "Invalid link format").optional().isString(),
];
