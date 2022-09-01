import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const signUp = async (req, res, next) => {
  try {
    // console.log("body", req.body);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send("User has been created");
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const checkuser = await User.findOne({ name: req.body.name });
    if (!checkuser) return next(createError(404, "User not found"));
    const isCorrect = await bcrypt.compare(
      req.body.password,
      checkuser.password
    );
    if (!isCorrect) return next(createError(400, "Wrong credentials"));

    const token = jwt.sign({ id: checkuser._id }, process.env.JWT);
    const { password, ...others } = checkuser._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    next(error);
  }
};
