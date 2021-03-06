const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// This will store all of the Posts
const posts = {};

// Get all the Posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

// Add a Post
app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  // Posting to the event bus
  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Recieved Event", req.body.type);
  res.send({});
});

// Listening on 4000
app.listen(4000, () => {
  console.log("Listening on Port 4000");
});
