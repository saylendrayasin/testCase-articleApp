const jwt = require("jsonwebtoken");

//make auth middleware
const auth = (req, res, next) => {
  try {
    let token = req.cookies.jwt;

    if (!token) {
      res.redirect("/login");
      return res.status(401);
    }

    const verified = jwt.verify(token, "secretKeys");

    if (!verified) {
      res.redirect("/login");
      return res
        .status(401)
        .json({ message: "Token verification failed, authorization denied" });
    } else {
      req.user = verified.id;
      next();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { auth };
