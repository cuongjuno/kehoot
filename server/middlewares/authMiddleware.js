const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
  {
    return res.status(401).json({ msg: 'Invalid credentials.Please try again' });
  }
  let tokenId = token.split(' ')[1];
  let decoded;
  try
  {
    decoded = await jwt.verify(tokenId, process.env.JWT_SECRET);
  } catch (error)
  {
    console.log(error);
    return res.status(500).json({ msg: 'Can not verify user' });
  }
  if (!decoded)
  {
    return res.status(401).json({ msg: 'Invalid credentials.Please try again' });
  }
  if (decoded.exp < Date.now())
  {
    return res.status(401).json({ msg: 'Token has been expired.Please login again!' });
  }
  req.user = decoded.user;
  next();
}

module.exports = { authMiddleware };