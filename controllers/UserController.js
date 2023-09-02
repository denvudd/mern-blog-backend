import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { email, fullName, avatarUrl } = req.body;

    const existingUser = await User.exists({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Пользователь с таким email уже зарегистрирован.",
      });
    }

    // encrypted password
    const password = req.body.password;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const doc = new User({
      email,
      fullName,
      avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign({ _id: user._id }, "secret", { expiresIn: "30d" });

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong... Please, try again later.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Something went wrong... Please, try again later.", // user not found
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(404).json({
        success: false,
        message: "Something went wrong... Please, try again later.", // invalid password
      });
    }

    const token = jwt.sign({ _id: user._id }, "secret", { expiresIn: "30d" });

    const { passwordHash, ...userData } = user._doc;

    res.json({
      success: true,
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong... Please, try again later.",
    });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        success: false,
        message: "This user doesn't exist.",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "You don't have access for this content.",
    });
  }
};
