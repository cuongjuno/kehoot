const express = require('express');
const { check } = require('express-validator');
const { createQuestion, getQuestions, getQuestionById } = require('../handlers/question');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');

/*
  @route POST /api/v1/questions
  @desc create a question
  @access Private
*/
router.post('/', [authMiddleware,
  [
    check('title', 'Title must not be empty').not().isEmpty(),
    check('answers', 'Answer list must not be empty').isArray({ min: 1 }),
    check('correctText', 'Correct answer text must be provide').notEmpty(),
    check('correctPosition', 'Correct answer position text must be valid').isInt({ min: 0 }),
    check('time', 'Time must be valid').not().isEmpty(),
    check('point', 'Point must be valid').not().isEmpty(),
    check('image', 'Image must be valid').not().isEmpty(),
  ]
], createQuestion);

/*
  @route GET /api/v1/questions
  @desc get all questions
  @access Public
*/
router.get('/', getQuestions);

/*
  @route GET /api/v1/questions/:id
  @desc get question by id
  @access Public
*/
router.get('/:id', getQuestionById);

module.exports = router;