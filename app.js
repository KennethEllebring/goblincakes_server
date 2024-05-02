const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { checkLoginToken } = require("./middleware/checkLoginToken");
const { authRoute } = require("./routes/authRoute");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"], // TODO: add cors support for vercel
    credentials: true,
  })
);
app.use(cookieParser());


const { newsRoute } = require("./routes/newsRoute");


app.get("/api/ping", (req, res) => res.sendStatus(200));
app.use("/api/auth", authRoute);
app.use("/api/news", newsRoute);


exports.app = app;
