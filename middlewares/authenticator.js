const jwt = require("jsonwebtoken");
module.exports = {
  authenticate: async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(400).json({
          error: "No token found!",
        });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log("VERIFY DEBUG --> err:", err);
        console.log("VERIFY DEBUG --> decoded user:", user);

        if (err) {
          return res.status(403).json({
            error: "Token not valid!",
          });
        }
        console.log(user);
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({
        error: "Unauthorized! No token found",
      });
    }
  },
};
