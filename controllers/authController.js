import User from "../models/user.js";

export const registerController = async (req, res, next) => {
  
    const { name, email, password } = req.body;

    if (!name) {
      return next("Please provide name");
    }
    if (!email) {
      return next("Please provide email");
    }
    if (!password) {
      return next("Please provide password");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
     return next("Email Already Resister Please Login");
    }

    const newUser = await User.create({ name, email, password });
    res.status(201).send({
      success: true,
      message: "User Created Successfully",
      newUser,
    });
};
