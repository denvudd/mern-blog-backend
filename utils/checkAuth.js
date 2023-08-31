import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (!token) {
    console.log("No token");
    return res.status(403).json({
      success: false,
      message: "Something went wrong... Please, try again later.",
    });
  }

  try {
    const decoded = jwt.verify(token, "secret");

    req.userId = decoded._id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      message: "Something went wrong... Please, try again later.",
    });
  }
};
