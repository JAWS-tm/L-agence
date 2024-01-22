import { Router } from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.middleware';
import { userController } from '../controllers/user.controller';

const userRouter = Router();


userRouter.get('/', isAuthenticated, isAdmin, userController.getUsers);
userRouter.delete('/:userId', isAuthenticated, isAdmin, userController.removeUser);
userRouter.post('/favourites', isAuthenticated, userController.addFavourites);
userRouter.delete('/favourites/:propertyId', isAuthenticated, userController.removeFavourites);
userRouter.get('/favourites',isAuthenticated, userController.getFavourites)

export default userRouter;
