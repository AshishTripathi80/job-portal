import User from "../models/user.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      next("Please provide name");
    }
    if (!email) {
      next("Please provide email");
    }
    if (!password) {
      next("Please provide password");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      next("Email Already Resister Please Login");
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).send({
      success: true,
      message: "User Created Successfully",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};
