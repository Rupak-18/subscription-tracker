import Subscription from "../models/subscription.model.js";
import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from "../config/env.js";

import dayjs from 'dayjs';

// 1
export const getAllSubscriptions = async (req, res, next) => {
  try {
    // Only admin can access all subscriptions
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    const subscriptions = await Subscription.find().populate('user', 'name email');

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

// 2
export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const now = new Date();
    const next30Days = dayjs().add(30, 'day').toDate();

    const subscriptions = await Subscription.find({
      user: req.user._id,
      status: 'active',
      renewalDate: { $gte: now, $lte: next30Days },
    });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

// 3
export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({ ...req.body, 
      user: req.user._id, 
    });

    const { workflowRunId } = await workflowClient.trigger({ 
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    });

    res.status(201).json({ success: true, data: { subscription, workflowRunId } });
  } catch (error) {
    next(error);
  }
}

// 4
export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) return res.status(404).json({ message: "Subscription not found" });

    if (subscription.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: Not your subscription" });
    }

    // Do not allow updating status or renewalDate manually
    const updatableFields = ['name', 'price', 'currency', 'frequency', 'category', 'paymentMethod', 'startDate'];
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        subscription[field] = req.body[field];
      }
    });

    await subscription.save();
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

// 5
export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) return res.status(404).json({ message: "Subscription not found" });

    if (subscription.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: Not your subscription" });
    }

    await Subscription.findByIdAndDelete(subscription._id);
    res.status(200).json({ success: true, message: "Subscription deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// 6
export const getUserSubscriptions = async (req, res, next) => {
  try {
    // check if the user is the same as the one in the token
    if(req.user.id != req.params.id) {
      const error = new Error('You are not the owner of this account');
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
}

// 7
export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) return res.status(404).json({ message: "Subscription not found" });

    if (subscription.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: Not your subscription" });
    }

    if (subscription.status !== 'active') {
      return res.status(400).json({ message: "Only active subscriptions can be cancelled" });
    }

    subscription.status = 'cancelled';
    await subscription.save();

    res.status(200).json({ success: true, message: "Subscription cancelled" });
  } catch (error) {
    next(error);
  }
};

// 8
export const getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) return res.status(404).json({ message: "Subscription not found" });

    if (subscription.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: Not your subscription" });
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

