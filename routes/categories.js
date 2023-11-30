import { Router } from "express";
import { CategoryModel } from "../models/Category.js";

const categoryRoute = Router();

categoryRoute.post("/", async (req, res) => {
  const newCat = new CategoryModel(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

categoryRoute.get("/", async (req, res) => {
  try {
    const cats = await CategoryModel.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { categoryRoute };
