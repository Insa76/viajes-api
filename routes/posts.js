import { Router } from "express";

import { PostModel } from "../models/Post.js";

const postRoute = Router();

//CREATE POST
postRoute.post("/", async (req, res) => {
  const newPost = new PostModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
postRoute.put("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await PostModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
postRoute.delete("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await PostModel.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
postRoute.get("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
postRoute.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await PostModel.find({ username });
    } else if (catName) {
      posts = await PostModel.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await PostModel.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { postRoute };
