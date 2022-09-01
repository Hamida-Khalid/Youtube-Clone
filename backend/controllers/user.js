import { createError } from "../error.js";
import User from "../models/User.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: res.body,
      });

      res.status(200).json(updateUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "you can update only your account"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json("user has been deleted");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "you can delete only your account"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successful");
  } catch (error) {
    next(error);
  }
};

export const unSubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("UnSubscription successful");
  } catch (error) {
    next(error);
  }
};

export const like = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const dislike = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
