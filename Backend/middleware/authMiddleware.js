const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Log the Authorization header for debugging
    console.log('Authorization Header:', req.header('Authorization'));

    // Get token from Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Extract the token
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Middleware Error:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};
