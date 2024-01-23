import { Router } from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.middleware';
import { userController } from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/', isAuthenticated, isAdmin, userController.getUsers);

// Favourites
userRouter.get('/favourites', isAuthenticated, userController.getFavourites);
userRouter.post('/favourites', isAuthenticated, userController.addFavourites);
userRouter.delete(
  '/favourites',
  isAuthenticated,
  userController.removeFavourites
);

// Rental management
userRouter.post('/rental', isAuthenticated, userController.addRental);
userRouter.delete(
  '/rental/:userId/:propertyId',
  isAuthenticated,
  isAdmin,
  userController.removeRentalAdmin
);
userRouter.delete('/rental', isAuthenticated, userController.removeRental);
userRouter.get(
  '/rental',
  isAuthenticated,
  isAdmin,
  userController.getAllRental
);
userRouter.get('/rental/me', isAuthenticated, userController.getRental);

userRouter.get(
  '/rental/application',
  isAuthenticated,
  userController.getRentalApplication
);
userRouter.get(
  '/rental/application/:id',
  isAuthenticated,
  userController.getRentalApplicationById
);

// In the end of the file because otherwise it would match the others delete routes (like /favourites)
userRouter.delete(
  '/:userId',
  isAuthenticated,
  isAdmin,
  userController.removeUser
);

export default userRouter;
