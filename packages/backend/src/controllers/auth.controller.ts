import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from '../models/User';
import { userService } from '../services/user.service';
import { classToPlain, instanceToPlain, serialize } from 'class-transformer';
import { mailerService } from '../services/mail.service';
import { UserRequest } from '../types/express';

const register = async (req: Request, res: Response) => {
  const data: User = req.body;

  if (!data.firstName || !data.lastName || !data.email || !data.password) {
    return res
      .status(400)
      .json({ status: 400, message: 'Some fields required are empty.' });
  }

  const userExists = await userService.findByEmail(data.email);
  if (userExists) {
    return res.status(409).json({
      status: 409,
      message: 'User already created.',
    });
  }

  await bcrypt
    .genSalt(5)
    .then((salt) => {
      return bcrypt.hash(data.password, salt);
    })
    .then((hash) => {
      data.password = hash;
    })
    .catch((err) => {
      console.error(err.message);
      return;
    });

  const user = await userService.add(data);

  if (user) {
    req.session.userId = user.id;

    mailerService.sendMail({
      email: user.email,
      subject: "Bienvenue sur L'agence",
      message: `Bonjour ${user.firstName} ${user.lastName},\n\nVotre compte a été créé avec succès. Vous pouvez désormais profiter des offres et postuler aux annonces.\n\nCordialement,\nL'équipe de L'agence.`,
    });

    return res.status(200).json({
      status: 200,
      message: 'Successfully registered.',
      user: user,
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

      return res.status(200).json({
        status: 200,
        message: 'Successfully authenticated.',
        user: instanceToPlain(user),
      });
    } else {
      // We don't inform the user that the password is wrong which would mean the email is correct
      return res
        .status(401)
        .json({ status: 401, message: 'Wrong credentials' });
    }
  } else {
    return res.status(401).json({ status: 401, message: 'Wrong credentials' });
  }
};

const logout = (req: UserRequest, res: Response) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    return res.sendStatus(200);
  });
};

const getMe = async (req: UserRequest, res: Response) => {
  const me = await User.findOne({
    where: {
      id: req.user.id,
    },
    relations: ['rentedProperty'],
  });

  return res.json({ status: 200, user: me });
};

export const authController = { register, login, logout, getMe };
