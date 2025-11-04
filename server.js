const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let posts = [];
let nextId = 1;

// get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// create a new post
app.post("/posts", (req, res) => {
  const { title, body } = req.body;
  const post = { id: nextId++, title, body };
  posts.push(post);
  res.json(post);
});

// update a post
app.put("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, body } = req.body;
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ error: "Not found" });
  post.title = title;
  post.body = body;
  res.json(post);
});

// delete a post
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter(p => p.id !== id);
  res.json({ success: true });
});

app.listen(8000, () => console.log("Server running at http://localhost:8000"));
