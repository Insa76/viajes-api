import { Router } from "express";
import * as bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";

export const authRoute = Router();

//REGISTER
authRoute.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const user = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    await user.save();
    res.status(200).json(user);
    console.log(user);
  } catch (error) {
    res.status(500).json({ error: "Couldn't create user" });
  }
});

//LOGIN
authRoute.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({ error: "Couldn't validate user" });
  }
});
