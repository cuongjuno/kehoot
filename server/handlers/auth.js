const { validationResult } = require('express-validator');
// const HttpError = require('../models/HttpError');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
  {
    return res.status(400).json({ errors: errors.array() });
  }
  let user;
  const { username, email, password, age } = req.body;
  try
  {
    user = await User.findOne({ email });
  } catch (error)
  {
    return res.status(500).json({ msg: 'Something went wrong.Please try again!' });
  }
  if (user)
  {
    return res.status(403).json({ msg: 'User with this email is already exist !' });
  }
  const hashPassword = await bcryptjs.hash(password, 10);
  user = new User({
    username, email, age,
    password: hashPassword
  });
  let savedUser;
  try
  {
    savedUser = await user.save();
  } catch (error)
  {
    return res.status(500).json({ msg: 'Can not create user!' });
  }
  if (savedUser)
  {
    const payload = { user: savedUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: Date.now() + (60 * 60 * 1000) });
    return res.json({ token });
  }
  return res.status(500).json({ msg: 'Something went wrong.Please try again!' });
}

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
  {
    return res.status(400).json({ errors: errors.array() });
  }
  let user;
  const { email, password } = req.body;
  try
  {
    user = await User.findOne({ email });
  } catch (error)
  {
    return res.status(500).json({ msg: 'Something went wrong. Please try again!' });
  }
  if (!user)
  {
    return res.status(401).json({ msg: 'Invalid credentials. Please try again!' });
  }
  const isMatched = await bcryptjs.compare(password, user.password);
  if (!isMatched)
  {
    return res.status(401).json({ msg: 'Invalid credentials. Please try again!' });
  }
  const payload = { user: user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: Date.now() + (60 * 60 * 1000) });
  return res.json({ token });
}

module.exports = {
  signup: signup,
  login: login
}

