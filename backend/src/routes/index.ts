import { Router } from "express";
import userRouter from "./userRoutes";

const appRouter = Router();

// all routes
const appRoutes = [
  {
    path: "/user",
    router: userRouter,
  },
];

appRoutes.forEach(route => {
  appRouter.use(route.path, route.router);
});

export default appRouter;