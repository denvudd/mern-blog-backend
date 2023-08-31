import { body } from "express-validator";

export const registerValidator = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be longer than 5 characters.").isLength({
    min: 5,
  }),
  body("fullName", "Full name must be longer than 3 characters.").isLength({
    min: 3,
  }),
  body("avatarUrl", "Invalid link format").optional().isURL(),
];
