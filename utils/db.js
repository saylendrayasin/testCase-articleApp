const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://smy:smy12345@cluster0.hn1doav.mongodb.net/article-app",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const database = mongoose.connection;

database.on("error", console.error.bind(console, "MongoDB connection error:"));
database.once("open", () => {
  console.log("Connected to database");
});
