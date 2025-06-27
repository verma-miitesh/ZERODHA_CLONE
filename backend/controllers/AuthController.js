const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../model/UsersModel");
const { createSecretToken } = require("../util/SecretToken");

const Signup = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        // .status(400)
        .json({ message: "User already registered", success: false });
    }
    if (typeof password !== 'string' || password.trim() === '') {
      return res.status(400).json({ message: "Invalid password", success: false });
    } 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
   
    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();

    const token = createSecretToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    res.status(200).json({
      message: `Welcome, ${newUser.username}`,
      success: true,
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });

    next();
  } catch (error) {
    // console.error("Signup Error:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const Login = async (req, res, next) => {
  try {
    
    const { email, password } = req.body;

    console.log(password);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res
        .status(400)
        .json({ message: "Please signup first", success: false });
    }

    const isPasswordValid =await bcrypt.compare(password, user.password);
    if (isPasswordValid===false) {
      return res
        // .status(400)
        .json({ message: "Invalid username or password", success: false });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    res.status(200).json({
      message: `Welcome, ${user.username}`,
      success: true,
      user: {
        username: user.username,
        email: user.email,
      },
    });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

module.exports = { Signup, Login };

// Signup Controller
// const Signup = async (req, res, next) => {
//   try {
//     console.log("Signup request body:", req.body);
//     const { email, username, password } = req.body;

//     if (!email || !username || !password) {
//       return res
//         .status(400)
//         .json({ message: "All fields are required", success: false });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "Email already in use", success: false });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ email, password: hashedPassword, username });

//     await newUser.save();

//     const token = createSecretToken(newUser._id);
//     res.cookie("token", token, {
//       httpOnly: true,
//       sameSite: "Lax",
//       secure: false,
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       success: true,
//       user: {
//         id: newUser._id,
//         email: newUser.email,
//         username: newUser.username,
//       },
//     });

//     next();
//   } catch (error) {
//     console.error("Signup Error:", error);
//     res.status(500).json({ message: "Server Error", success: false, error });
//   }
// };

// // Login Controller
// const Login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     // Validation
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "All fields are required", success: false });
//     }

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found, please signup", success: false });
//     }

//     // Compare passwords
//     const auth = await bcrypt.compare(password, user.password);
//     if (!auth) {
//       return res
//         .status(400)
//         .json({ message: "Incorrect email or password", success: false });
//     }

//     // Generate Token
//     const token = createSecretToken(user._id);
//     res.cookie("token", token, {
//       httpOnly: true,
//       sameSite: "Lax",
//       secure: false,
//     });

//     res
//       .status(200)
//       .json({ message: "User logged in successfully", success: true });
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error", success: false });
//   }
// };

// module.exports = { Signup, Login };