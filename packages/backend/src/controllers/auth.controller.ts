import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from '../models/User';
import { userService } from '../services/user.service';
import { classToPlain, instanceToPlain, serialize } from 'class-transformer';
import { mailerService } from '../services/mail.service';

const register = async (req: Request, res: Response) => {
  const data: User = req.body;

  if (!data.firstName || !data.lastName || !data.email || !data.password) {
    return res
      .status(400)
      .json({ status: 400, message: 'Some fields required are empty.' });
  }

  const userExists = await userService.findByEmail(data.email);
  if (userExists) {
    return res
      .status(400)
      .json({ status: 400, message: "L'email est déjà utilisé." });
  }

  await bcrypt
    .hash(data.password, 5)
    .then((hash) => {
      user.password = hash;
    })
    .catch((err) => {
      console.error(err.message);
      return;
    });

  const user = await userService.add(data);

  if (user) {
    console.log('registered with success');

    mailerService.sendMail({
      email: user.email,
      subject: "Bienvenue sur L'agence",
      message: `Bonjour ${user.firstName} ${user.lastName},\n\nVotre compte a été créé avec succès. Vous pouvez désormais profiter des offres et postuler aux annonces.\n\nCordialement,\nL'équipe de L'agence.`,
    });

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
