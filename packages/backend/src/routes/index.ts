import { Router } from 'express';
import userRouter from './userRoutes';
import authRouter from './authRoutes';

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
];

appRoutes.forEach((route) => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
