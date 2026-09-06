const adminMiddleware = async (req, res, next) => {
  try {
    const isAdmin = req.user.isAdmin;

    if (!isAdmin) {
      return res.status(403).json({
        message: "Access denied. User is not an admin",
      });
    }

    next();
  } catch (error) {
    console.log("ADMIN MIDDLEWARE ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = adminMiddleware;