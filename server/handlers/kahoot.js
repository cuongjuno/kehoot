const { validationResult } = require('express-validator');
const Kahoot = require('../models/Kahoot');

const createKahoot = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
  {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description, listQuestion, image } = req.body;
  const newKahoot = new Kahoot({
    user: req.user,
    title,
    description,
    image,
    listQuestion
  });
  try
  {
    await newKahoot.save();
    return res.status(201).json(newKahoot.toObject({ getters: true }));
  } catch (error)
  {
    return res.status(500).json({ msg: 'Something went wrong.Please try again!' });
  }
}
const getKahoots = async (req, res) => {
  let kahoots;
  try
  {
    kahoots = await Kahoot.find({});
  } catch (error)
  {
    return res.status(500).json({ msg: 'Something went wrong.Please try again!' });
  }
  if (!kahoots)
  {
    return res.status(403).json({ msg: 'Can not load kahoots' });
  }
  return res.json(kahoots);
}

const getKahootsByUserId = async (req, res) => {
  let kahoots;
  try
  {
    kahoots = await Kahoot.find({ user: req.params.userId });
  } catch (error)
  {
    return res.status(500).json({ msg: 'Something went wrong.Please try again!' });
  }
  if (!kahoots)
  {
    return res.status(403).json({ msg: 'Can not find kahoots for this user' });
  }
  return res.json(kahoots);
}

const getKahootById = async (req, res) => {
  let kahoot;
  try
  {
    kahoot = await Kahoot.findById(req.params.id);
  } catch (error)
  {
    return res.status(500).json({ msg: 'Something went wrong.Please try again!' });
  }
  if (!kahoot)
  {
    return res.status(403).json({ msg: 'Can not find kahoot' });
  }
  return res.json(kahoot);
}

module.exports = { createKahoot, getKahoots, getKahootsByUserId, getKahootById };