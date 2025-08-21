const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { time } = require('../utils/time');

// const signup = async (req, res) => {
//   try {
//     const { username, firstName, lastName, email, password } = req.body;

//     // Validate required fields
//     if (!username || !firstName || !lastName || !email || !password) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     // Check if email or username already exists
//     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//     if (existingUser) {
//       return res.status(409).json({ message: 'Username or email already in use.' });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create user
//     const newUser = await User.create({
//       username,
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       createdAt: time()
//     });


//     return res.status(201).json({
//       message: 'User registered successfully.',
//       user: {
//         id: newUser._id,
//         username: newUser.username,
//         email: newUser.email,
//       }
//     });

//   } catch (error) {
//     console.error('Signup Error:', error);
//     return res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required.' });
//     }

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password.' });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password.' });
//     }

//     // Generate JWT
//     const token = jwt.sign(
//       { id: user._id, username: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.cookie("usertoken", token, {
//       httpOnly: true,
//       secure: true,
//     })

//     return res.status(200).json({
//       message: 'Login successful.',
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         firstName: user.firstName,
//         lastName: user.lastName
//       }
//     });

//   } catch (error) {
//     console.error('Login Error:', error);
//     return res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// };

// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) return res.status(400).json({ message: 'Email is required.' });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User with this email does not exist.' });

//     // Generate a 6-digit numeric OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Save OTP to user in DB (you can set expiry if you want)
//     user.otp = otp;
//     await user.save();

//     // Setup nodemailer transport (using Gmail here, can be any SMTP)
//     let transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,  // your email
//         pass: process.env.EMAIL_PASS   // your email password or app password
//       }
//     });

//     // Email content
//     let mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: 'Your OTP for Password Reset',
//       text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`
//     };

//     // Send email
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Email sending error:', error);
//         return res.status(500).json({ message: 'Failed to send OTP email.' });
//       } else {
//         return res.status(200).json({ message: 'OTP sent to your email.' });
//       }
//     });

//   } catch (error) {
//     console.error('Forgot Password error:', error);
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// };


// const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, password } = req.body;

//     // Validate input
//     if (!email || !otp || !password ) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Check if OTP matches
//     if (!user.otp || user.otp !== otp) {
//       return res.status(400).json({ message: 'Invalid or expired OTP.' });
//     }

//     // Hash new password
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     // Clear OTP
//     user.otp = null;

//     await user.save();

//     return res.status(200).json({ message: 'Password reset successful.' });

//   } catch (error) {
//     console.error('Reset Password Error:', error);
//     return res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// };


const signup = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    // Validate required fields
    if (!username || !firstName || !lastName || !email || !password) {
      return res.status(400).json({ err: true, message: 'All fields are required.' });
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ err: true, message: 'Username or email already in use.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      createdAt: time()
    });

    return res.status(201).json({
      err: false,
      message: 'User registered successfully.',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      }
    });

  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({ err: true, message: 'Server error. Please try again later.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ err: true, message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ err: true, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ err: true, message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie("usertoken", token, {
      httpOnly: true,
      secure: true,
    });

    return res.status(200).json({
      err: false,
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ err: true, message: 'Server error. Please try again later.' });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ err: true, message: 'Email is required.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ err: true, message: 'User with this email does not exist.' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    await user.save();

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Email sending error:', error);
        return res.status(500).json({ err: true, message: 'Failed to send OTP email.' });
      } else {
        return res.status(200).json({ err: false, message: 'OTP sent to your email.' });
      }
    });

  } catch (error) {
    console.error('Forgot Password error:', error);
    res.status(500).json({ err: true, message: 'Server error. Please try again later.' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({ err: true, message: 'All fields are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ err: true, message: 'User not found.' });
    }

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ err: true, message: 'Invalid or expired OTP.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.otp = null;

    await user.save();

    return res.status(200).json({ err: false, message: 'Password reset successful.' });

  } catch (error) {
    console.error('Reset Password Error:', error);
    return res.status(500).json({ err: true, message: 'Server error. Please try again later.' });
  }
};



module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword
};
