const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getAllUsers, getMyProfile } = require('../handlers/user');
const router = express.Router();

/*
  @route GET /api/v1/user/me
  @desc get my profile
  @access Private
*/

router.get('/me', authMiddleware, getMyProfile);

/*
  @route GET /api/v1/user
  @desc get all users
  @access Private
*/

router.get('/', authMiddleware, getAllUsers);

module.exports = router;