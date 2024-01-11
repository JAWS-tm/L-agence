import { Router } from 'express';
import { isAdmin, isAuthenticated } from '../middleware/auth.middleware';
import { propertyController } from '../controllers/property.controller';

const propertyRouter = Router();

propertyRouter.get('/', propertyController.getAll);

propertyRouter.post('/', isAuthenticated, isAdmin, propertyController.create);
propertyRouter.put('/', isAuthenticated, isAdmin, propertyController.update);
propertyRouter.delete(
  '/:id',
  isAuthenticated,
  isAdmin,
  propertyController.remove
);

export default propertyRouter;
