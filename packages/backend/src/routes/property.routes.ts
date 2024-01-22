import { Router } from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.middleware';
import { propertyController } from '../controllers/property.controller';
import { uploadMiddleware } from '../utils/file';

const propertyRouter = Router();

propertyRouter.get('/', propertyController.getAll);
propertyRouter.get('/:id', propertyController.getById);



propertyRouter.post(
  '/',
  isAuthenticated,
  isAdmin,
  uploadMiddleware.array('images', 10),
  propertyController.create
);
propertyRouter.put('/:id', isAuthenticated, isAdmin, propertyController.update);
propertyRouter.delete(
  '/:id',
  isAuthenticated,
  isAdmin,
  propertyController.remove
);

propertyRouter.post(
  '/:id/apply',
  isAuthenticated,
  uploadMiddleware.fields([
    {
      name: 'idCard',
      maxCount: 1,
    },
    {
      name: 'proofOfAddress',
      maxCount: 1,
    },
  ]),
  propertyController.rentalApplication
);

propertyRouter.post(
  '/apply',
  isAuthenticated,
  isAdmin,
  propertyController.getAllApply
);

propertyRouter.post(
  '/apply/:id/:state',
  isAuthenticated,
  isAdmin,
  propertyController.changeApplicationState
);


export default propertyRouter;
