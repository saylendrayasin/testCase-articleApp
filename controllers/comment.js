const Comment = require("../models/comments.js");

get = async (req, res) => {
  await Comment.find()
    .then((comments) => {
      res.send(comments);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while getting comments from database",
      });
    });
};

post = async (req, res) => {
  const comment = new Comment({
    name: req.body.name,
    comment: req.body.comment,
  });
  await comment
    .save()
    .then((comment) => {
      if (!comment) {
        res.status(404).send({
          message: "Comment not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while inserting comment to database",
      });
    });
};

update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty",
    });
  }
  const id = req.params.id;
  await Comment.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update comment with id=${id}`,
        });
      } else res.send({ message: "Comment was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while getting comment from database",
      });
    });
};

remove = async (req, res) => {
  const id = req.params.id;
  await Comment.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete comment with id=${id}`,
        });
      } else {
        res.send({
          message: "Comment was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while getting comment from database",
      });
    });
};

getOne = async (req, res) => {
  const id = req.params.id;
  await Comment.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot get comment with id=${id}`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while getting comment from database",
      });
    });
};

module.exports = { get, post, update, remove, getOne };
