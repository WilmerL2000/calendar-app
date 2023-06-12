import jwt from 'jsonwebtoken';
import User from '../mongodb/models/User.js';

const validateJWT = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  if (authorization && authorization.startsWith('Bearer ')) {
    try {
      token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //*Create a session in express that can be used in all routes
      req.user = await User.findById(decoded.uid).select('-password');
      //Next middleware
      return next();
    } catch (err) {
      const error = new Error('Token no válido ');
      res.status(401).send({ msg: error.message, ok: false });
    }
  }

  if (!token) {
    const error = new Error('Token no válido o inexistente');
    res.status(401).send({ msg: error.message, ok: false });
  }

  next();
};

export default validateJWT;
