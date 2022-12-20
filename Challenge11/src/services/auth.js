import Config from '../config';
import { User, UserModel } from '../models/user';
import jwt from 'jsonwebtoken';

export const generateAuthToken = (user) => {

  const payload = {
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    admin: user.admin,
  };

  const token = jwt.sign(payload, Config.TOKEN_SECRET_KEY, {
    expiresIn: '1m',   
  });
  return token;
};

export const checkAuth = async (req, res, next) => {

  const token = req.headers['x-auth-token'];

  if (!token) return res.status(401).json({ msg: 'Unauthorized' });

  try {
    const decode = jwt.verify(
      token,
      Config.TOKEN_SECRET_KEY
    );
    console.log(decode);

    const user = await UserModel.findById(decode.userId);

    if (!user) return res.status(400).json({ msg: 'Unauthorized' });

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: 'Unauthorized' });
  }
};