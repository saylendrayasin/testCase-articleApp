const express = require("express");
const path = require("path");
const router = express.Router();

const commentController = require("../controllers/comment.js");
const userController = require("../controllers/auth.js");

const { auth } = require("../middleware/auth.js");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});
router.get("/admin", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin.html"));
});
router.get("/admin/edit/:id", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/edit.html"));
});

router.post("/user/login", userController.login);
router.post("/user/register", userController.register);
router.get("/user/logout", userController.logout);

router.get("/getOne/:id", commentController.getOne);
router.get("/comments", commentController.get);
router.post("/comments", commentController.post);
router.put("/comments/:id", commentController.update);
router.delete("/comments/:id", commentController.remove);

router.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

module.exports = router;
