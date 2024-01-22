import { Router } from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.middleware';
import { userController } from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/favourites', isAuthenticated, userController.addFavourites);
userRouter.delete('/favourites', isAuthenticated, userController.removeFavourites);
userRouter.get('/favourites',isAuthenticated, userController.getFavourites);

userRouter.post('/rental',isAuthenticated, isAdmin, userController.addRental);
userRouter.delete('/rental/:propertyId', isAuthenticated, isAdmin, userController.removeRentalAdmin);
userRouter.delete('/rental', isAuthenticated, userController.removeRental);
userRouter.get('/rental', isAuthenticated, isAdmin, userController.getAllRental);
userRouter.get('/rental/me', isAuthenticated, userController.getRental);

export default userRouter;
