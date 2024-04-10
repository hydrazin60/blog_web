// auth.controller.js
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  const hashpassword = bcryptjs.hashSync(password, 6);

  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  try {
    await newUser.save();
    res.json("Signup Successful");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }

    const tokenPayload = {
      id: user._id,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const { password: pass, ...rest } = user._doc;
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const tokenPayload = {
        id: user._id,
        isAdmin: user.isAdmin,
      };
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashpassword = bcryptjs.hashSync(generatedPassword, 6);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashpassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const tokenPayload = {
        id: newUser._id,
        isAdmin: newUser.isAdmin,
      };
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

/// before correct code to post
// import User from "../models/user.model.js";
// import bcryptjs from "bcryptjs";
// import { errorHandler } from "../utils/error.js";
// import jwt from "jsonwebtoken"; // Changed Jwt to jwt for consistency

// // Signup Controller
// export const signup = async (req, res, next) => {
//   const { username, email, password } = req.body;

//   // Check if username, email, or password is missing or empty
//   if (
//     !username ||
//     !email ||
//     !password ||
//     username.trim() === "" ||
//     email.trim() === "" ||
//     password.trim() === ""
//   ) {
//     return next(errorHandler(400, "All fields are required")); // Return added for early exit
//   }

//   const hashpassword = bcryptjs.hashSync(password, 6);

//   const newUser = User({
//     username,
//     email,
//     password: hashpassword,
//   });

//   try {
//     await newUser.save();
//     res.json("Signup Successful");
//   } catch (error) {
//     next(error);
//   }
// };

// // Signin Controller
// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password || email === "" || password === "") {
//     return next(errorHandler(400, "All fields are required")); // Return added for early exit
//   }
//   try {
//     const validUser = await User.findOne({ email });
//     if (!validUser) {
//       return next(errorHandler(404, "User not found")); // Return added for early exit
//     }
//     const validPassword = bcryptjs.compareSync(password, validUser.password); // Corrected variable name
//     if (!validPassword) {
//       return next(errorHandler(400, "Invalid Password")); // Typo corrected
//     }

//     const token = jwt.sign(
//       { id: validUser._id , isAdmin : isAdmin },
//       process.env.JWT_SECRET,
//       { expiresIn: "30d" } // Token expires after 30 days
//     );

//     const { password: pass, ...rest } = validUser._doc; // Removed unnecessary variable
//     res
//       .status(200)
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

// // Google OAuth Controller
// export const google = async (req, res, next) => {
//   const { email, name, googlePhotoUrl } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       const token = jwt.sign({ id: user._id , isAdmin : user.isAdmin }, process.env.JWT_SECRET);
//       const { password, ...rest } = user._doc;
//       res
//         .status(200)
//         .cookie("access_token", token, {
//           httpOnly: true,
//         })
//         .json(rest);
//     } else {
//       const generatedPassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const hashpassword = bcryptjs.hashSync(generatedPassword, 6);

//       const newUser = new User({
//         username:
//           name.toLowerCase().split(" ").join("") +
//           Math.random().toString(9).slice(-4),
//         email,
//         password: hashpassword,
//         profilePicture: googlePhotoUrl,
//       });
//       await newUser.save(); // in hear
//       const token = jwt.sign({ id: newUser._id ,isAdmin : newUser.isAdmin }, process.env.JWT_SECRET);
//       const { password, ...rest } = newUser._doc;
//       res
//         .status(200)
//         .cookie("access_token", token, {
//           httpOnly: true,
//         })
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// };
