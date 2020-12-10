const User = require('../models/User');

const getMyProfile = async (req, res) => {
  try
  {
    const user = await User.findById(req.user).select('-password');
    if (!user)
    {
      return res.status(404).json({ msg: 'Can not find user' });
    }
    return res.json(user);
  } catch (error)
  {
    return res.status(500).json({ msg: 'Something went wrong.Please try again!' });
  }
}

const getAllUsers = async (req, res) => {
  try
  {
    const users = await User.find({});
    return res.json(users);
  } catch (error)
  {
    return res.status(500).json({ msg: 'Something went wrong.Please try again!' });
  }
}

module.exports = { getMyProfile, getAllUsers };