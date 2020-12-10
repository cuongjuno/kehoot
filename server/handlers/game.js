const { validationResult } = require('express-validator');
const Game = require('../models/Game');

const createGame = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
  {
    return res.status(400).json({ errors: errors.array() });
  }
  const { questions } = req.body;
  if (questions.length === 0 || !questions)
  {
    return res.status(400).json({ msg: 'Questions must be provide' });
  }
  const newGame = new Game({
    host: req.user,
    questions
  });
  try
  {
    const savedNewGame = await newGame.save();
    return res.json(savedNewGame);
  } catch (error)
  {
    return res.status(500).json({ msg: 'Something went wrong.Please try again!' });
  }
}

const getGames = async (req, res) => {

}

module.exports = { createGame, getGames };