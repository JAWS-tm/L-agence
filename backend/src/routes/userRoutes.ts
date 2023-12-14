import { Router } from "express";


const userRouter = Router();

// Routes examples for user 
// requireUser is a middleware to check if user is logged in (not implemented yet)
// userRouter.get("/", requireUser, getUserData); 
// userRouter.patch("/", requireUser, validateRequest(updateSchema), updateUser);

export default userRouter;