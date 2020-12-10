const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { signup, login } = require('../handlers/auth');

/*
  @route POST /api/v1/auth/signup
  @desc create an user
  @access Public
*/
router.post('/signup', [
  check('username', 'User name must not be empty').not().isEmpty(),
  check('email', 'Email must be valid').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('age', 'Age must be valid').isInt({ min: 1 })
], signup);

/*
  @route POST /api/v1/auth/login
  @desc login user
  @access Public
*/
router.post('/login', [
  check('email', 'Email must be valid').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], login);



module.exports = router;