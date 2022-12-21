const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./backend/config/config.env" });
}

const connectDatabase = () => {
  console.log(process.env.MONGO_URI);
  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => console.log(`Database Connected: ${con.connection.host}`))
    .catch((err) => console.log(err));
};

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ limit: "150mb", extended: true }));
app.use(
  express.raw({
    type: [
      "application/octet-stream",
      "application/x-www-form-urlencoded",
      "image/*",
      "video/*",
    ],
    limit: 150 * 1024 * 1024,
  })
);
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 150 * 1024 * 1024 },
    useTempFiles: true,
  })
);

app.use(cors());

// Importing Routes
const post = require("./backend/routes/post");
const user = require("./backend/routes/user");
const conversations = require("./backend/routes/conversations");
const messages = require("./backend/routes/messages");
const reel = require("./backend/routes/reel");

// Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);
app.use("/api/v1", conversations);
app.use("/api/v1", messages);
app.use("/api/v1", reel);

app.listen(process.env.PORT, () =>
  console.log(`app listening on process.env.PORT ${process.env.PORT}!`)
);
