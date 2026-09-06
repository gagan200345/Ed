const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized HTTP, Token not provided",
    });
  }

  console.log("token from authmiddleware", token);

  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET_KEY
    );

    console.log(isVerified);

    const userData = await User.findOne({
      email: isVerified.email,
    }).select({ password: 0 });

    req.user = userData;
    req.token = jwtToken;
    req.userId = userData._id;

    next();  

  } catch (error) {
    console.log(`Error from the auth middleware: ${error}`);

    return res.status(401).json({
      msg: "Unauthorized token",
    });
  }
};

module.exports = authMiddleware;