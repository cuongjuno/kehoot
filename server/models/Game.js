const mongoose = require('mongoose');
const User = require('./User');
const Question = require('./Question');

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  users: [
    {
      user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      score: {
        type: Number,
        default: 0
      }
    }
  ],
  questions: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Question'
    }
  ],
  host: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true });

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;


