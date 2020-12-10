const { validationResult } = require('express-validator');
const Question = require('../models/Question');

const createQuestion = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
  {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, answers, correctText, correctPosition, time, point } = req.body;
  const newQuestion = new Question({
    user: req.user,
    title,
    answers,
    correctAnswer: {
      text: correctText,
      position: correctPosition
    },
    time, point
  });
  try
  {
    await newQuestion.save();
    return res.status(201).json(newQuestion.toObject({ getters: true }));
  } catch (error)
  {
    return res.status(500).json({ msg: 'Something went wrong.Please try again!' });
  }
}

const getQuestions = async (req, res) => {
  let questions;
  try
  {
    questions = await Question.find({});
  } catch (error)
  {
    return res.status(500).json({ msg: 'Something went wrong.Please try again!' });
  }
  if (!questions)
  {
    return res.status(403).json({ msg: 'Can not load questions' });
  }
  return res.json(questions);
}
const getQuestionById = async (req, res) => {
  let question;
  try
  {
    question = await Question.findById(req.params.id);
  } catch (error)
  {
    return res.status(500).json({ msg: 'Something went wrong.Please try again!' });
  }
  if (!question)
  {
    return res.status(404).json({ msg: 'Can not find question' });
  }
  return res.json(question);
}

module.exports = { createQuestion, getQuestions, getQuestionById };