import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from '../models/User';
import { userService } from '../services/user.service';
import { classToPlain, instanceToPlain, serialize } from 'class-transformer';

const register = async (req: Request, res: Response) => {
  const user: User = req.body;

  if (!user.firstName || !user.lastName || !user.email || !user.password) {
    return res
      .status(400)
      .json({ status: 400, message: 'Some fields required are empty.' });
  }

  await bcrypt
    .hash(user.password, 5)
    .then((hash) => {
      user.password = hash;
    })
    .catch((err) => {
      console.error(err.message);
      return;
    });

  const query = await userService.add(user);

  if (query) {
    console.log('registered with success');
    return res.status(200).json({
      status: 200,
      message: 'Successfully registered.',
    });
  }
};

const login = async (req: Request, res: Response) => {
  const credentials: { email: string; password: string } = req.body;

  const user = await userService.findByEmail(credentials.email);

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

      return res.status(200).json({
        status: 200,
        message: 'Successfully authenticated.',
        user: instanceToPlain(user),
      });
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
