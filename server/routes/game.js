const express = require('express');
const { check } = require('express-validator');
const { createGame, getGames } = require('../handlers/game');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');

/*
  @route POST /api/v1/game
  @desc create a game
  @access Private
*/
router.post('/', [authMiddleware, [
  check('questions', 'Questions must be provide').notEmpty(),
]], createGame);

/*
  @route GET /api/v1/questions
  @desc get all questions
  @access Public
*/
router.get('/', getGames);

module.exports = router;