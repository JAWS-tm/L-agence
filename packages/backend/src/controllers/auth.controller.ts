import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from 'src/models/User';
import { userService } from '../services/user.service';

const register = async (req: Request, res: Response) => {
  const user: User = req.body;

  if (user.firstName && user.lastName && user.email && user.password) {
    await bcrypt
      .genSalt(5)
      .then((salt) => {
        console.log('Salt: ', salt);
        return bcrypt.hash(user.password, salt);
      })
      .then((hash) => {
        console.log('Hash: ', hash);
        user.password = hash;
      })
      .catch((err) => {
        console.error(err.message);
        return;
      });

    user.id = crypto.randomBytes(16).toString('hex');

    const query = await userService.add(user);

    if (query) {
      console.log('registered with success');
      const token = crypto.randomBytes(16).toString('hex');
      return res.status(200).json({
        status: 200,
        message: 'Resgisteration with success.',
        token: token,
      });
    }
  } else {
    return res
      .status(400)
      .json({ status: 400, message: 'Some fields required are empty.' });
  }
};

const login = async (req: Request, res: Response) => {
  const credentials: { email: string; password: string } = req.body;
  console.log('credential :', credentials);

  const user: User = await userService.findByEmail(credentials.email);

  if (user) {
    let success = false;
    await bcrypt
      .compare(credentials.password, user.password)
      .then((res) => {
        success = res;
      })
      .catch((err) => {
        console.error(err.message);
        return;
      });

    if (success) {
      req.session.userId = user.id;

      console.log('user is authenticated');
      return res
        .status(200)
        .json({ status: 200, message: 'user is authenticated', user: user });
    } else {
      console.log('password doesn`t match');
      // We don't inform the user that the password is wrong which would mean the email is correct
      return res
        .status(401)
        .json({ status: 401, message: 'Wrong credentials' });
    }
  } else {
    console.log('Email not found');
    return res.status(401).json({ status: 401, message: 'Wrong credentials' });
  }
};

export const authController = { register, login };
