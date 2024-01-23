import { Router } from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.middleware';
import { propertyController } from '../controllers/property.controller';
import { uploadMiddleware } from '../utils/file';

const propertyRouter = Router();

/*----------------------*/
/* GET methods */
propertyRouter.get('/', propertyController.getAll);
propertyRouter.get('/:id', propertyController.getById);

/*----------------------*/
/* POST methods */
// Add a new property
propertyRouter.post(
  '/',
  isAuthenticated,
  isAdmin,
  uploadMiddleware.array('images', 10),
  propertyController.create
);
// get all rental application
propertyRouter.post(
  '/apply',
  isAuthenticated,
  isAdmin,
  propertyController.getAllApply
);
// Apply for a property
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
// Update the state of a rental application
propertyRouter.post(
  '/apply/:id/:state',
  isAuthenticated,
  isAdmin,
  propertyController.changeApplicationState
);

/*----------------------*/
// DELETE methods
// Delete a property
propertyRouter.delete(
  '/:id',
  isAuthenticated,
  isAdmin,
  propertyController.remove
);

/*----------------------*/
// PUT methods
// Update a property
propertyRouter.put('/:id', isAuthenticated, isAdmin, propertyController.update);

export default propertyRouter;
