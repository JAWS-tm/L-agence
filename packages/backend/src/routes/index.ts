import { Router } from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import contactRouter from './contact.routes';

const appRouter = Router();

// all routes
const appRoutes = [
  {
    path: '/user',
    router: userRouter,
  },
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/contact',
    router: contactRouter,
  },
];

appRoutes.forEach((route) => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
