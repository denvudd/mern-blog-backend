import { body } from "express-validator";

export const postCreateValidator = [
  body("title", "Title is required").isLength({ min: 3 }).isString(),
  body("text", "Text is required").isLength({ min: 10 }).isString(),
  body("tags", "Invalid tags format").optional().isArray(),
  body("imageUrl", "Invalid link format").optional().isString(),
];