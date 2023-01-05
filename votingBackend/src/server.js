const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send({
    status: "OK",
    message: "Welcome to Voting Backend send requests to /api",
  });
});

const routes = require("./routes/vote");
app.use("/api", routes);

const port = process.env.PORT || "5000";
app.set("port", port);

var server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI, {}).then(() => {
  console.log("Connected to MongoDB");
  server.listen(port);
  server.on('listening', () => console.log(`Listening on port ${port}`))
  server.on("error", (error) => {
    console.error(error);
    process.exit(1);
  });
  server.on("close", () =>
    mongoose.connection.close(() => {
      console.log("Disconnected from MongoDB");
      process.exit(0);
    })
  );
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Disconnected from MongoDB");
    process.exit(0);
  });
});
