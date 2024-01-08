import { Request, NextFunction, Response } from 'express';
import { userService } from 'src/services/user.service';
import { UserRequest } from 'src/types/express';

export async function isAuthenticated(
  req: UserRequest,
  next: NextFunction,
  res: Response
) {
  const user = await userService.findById(req.session.userId);
  if (!user) {
    res.send(401);
  } else {
    req.user = user;
    return next();
  }
}
