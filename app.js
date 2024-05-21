const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { authRoute } = require("./routes/authRoute");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://goblincakes.vercel.app/"],
    credentials: true,
  })
);
app.use(cookieParser());


const { newsRoute } = require("./routes/newsRoute");
const { forumRoute } = require("./routes/forumRoute");
const { applicationRoute } = require("./routes/applicationRoute");
const { blizzardRaidRoute } = require("./routes/blizzardRaidRoute");
const { warcraftlogsRoute } = require("./routes/warcraftlogsRoute");
const { raiderIoRoute } = require("./routes/raiderIoRoutes");


app.get("/api/ping", (req, res) => res.sendStatus(200));
app.use("/api/auth", authRoute);
app.use("/api/news", newsRoute);
app.use("/api/forum", forumRoute);
app.use("/api/application", applicationRoute);
app.use("/api/blizzard", blizzardRaidRoute);
app.use("/api/warcraftlogs", warcraftlogsRoute);
app.use("/api/raiderio", raiderIoRoute)


module.exports = { app };
