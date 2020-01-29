const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

// router.get('/', (req, res) => {
//     db('posts')
//         .then(posts => console.log(posts))
//         .catch(err => console.log('ERR', err));

// });

// Async Await way
router.get("/", async (req, res) => {
  try {
    const posts = await db("posts");
    // select * from posts
    console.log(posts);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to get posts" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // SELECT * FROM posts WHERE id = 12
    const post = await db("posts").where("id", id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to get posts" });
  }
});

router.post("/", async (req, res) => {
  const postData = req.body;
  try {
    const post = await db("posts").insert(postData);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to insert posts" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const rowsUpdated = await db("posts")
      .where({ id })
      .update(req.body);
    res.status(200).json({ update: rowsUpdated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update posts" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const rowsDeleted = await db("posts")
      .where("id", req.params.id)
      .del();
    res.json({ deletedRecords: rowsDeleted });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete posts" });
  }
});

module.exports = router;
