import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../models/user';
import {
  validateNewUser,
  getUserByEmail,
  createUser,
} from '../controllers/users';
import Logger from './logger';
import { NotificationService } from './notifications';

const strategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

const login = async (req, username, password, done) => {
  Logger.info('LOGINNN');

  const user = await getUserByEmail(username);
  if (!user) {
    return done(null, false, { message: 'Invalid Username/Password' });
  }
  const isValidPassword = await user.isValidPassword(password);

  if (!isValidPassword) {
    return done(null, false, { message: 'Invalid Username/Password' });
  }

  Logger.info('SALIO TODO BIEN');
  return done(null, user);
};

const signup = async (req, username, password, done) => {
  try {
    Logger.info('ENTRE');
    Logger.info(req.body);
    const { firstName, lastName, age, admin, address } = req.body;

    // Nota: Username y password no se verifica porque ya lo hace passport.
    if (validateNewUser(req.body)) {
      Logger.error('Invalid body fields');
      return done(null, false, { message: 'Invalid Body Fields' });
    }

    const user = await getUserByEmail(username);

    if (user) {
      Logger.error('User already exists');
      return done(null, false, { message: 'User already exists' });
    } else {
      const userData = {
        email: username,
        password,
        firstName,
        lastName,
        age,
        admin,
        address,
      };

      const newUser = await createUser(userData);
      await NotificationService.notifyNewUserByEmail(newUser);
      return done(null, newUser);
    }
  } catch (error) {
    done(error);
  }
};

export const loginFunc = new LocalStrategy(strategyOptions, login);
export const signUpFunc = new LocalStrategy(strategyOptions, signup);


passport.serializeUser((user, done) => {
  Logger.info('Se Ejecuta el serializeUser');

  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  Logger.info('Se Ejecuta el deserializeUser');
  UserModel.findById(userId).then((user) => {
    return done(null, user);
  });
});