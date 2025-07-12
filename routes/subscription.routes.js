import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { 
  getAllSubscriptions,
  getUpcomingRenewals,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getUserSubscriptions,
  cancelSubscription,
  getSubscriptionById,  
} from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

// 1
subscriptionRouter.get('/', authorize, getAllSubscriptions);

// 2
subscriptionRouter.get('/upcoming-renewal', authorize, getUpcomingRenewals);

// 3
subscriptionRouter.post('/', authorize, createSubscription);

// 4
subscriptionRouter.put('/:id', authorize, updateSubscription);

// 5
subscriptionRouter.delete('/:id', authorize, deleteSubscription);

// 6
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

// 7
subscriptionRouter.post('/:id/cancel', authorize, cancelSubscription);

// 8
subscriptionRouter.get('/:id', authorize, getSubscriptionById);

export default subscriptionRouter;