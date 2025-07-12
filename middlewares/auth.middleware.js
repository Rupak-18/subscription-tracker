import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import TokenBlacklist from "../models/tokenBlacklist.model.js";

const authorize = async (req, res, next) => {
  try {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if(!token) return res.status(401).json({ message: 'Unauthorized' });

    // Check if token is blacklisted
    const blacklisted = await TokenBlacklist.findOne({ token });
    if (blacklisted) return res.status(401).json({ message: 'Token has been revoked' });

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if(!user) return res.status(401).json({ message: 'Unauthorized' });

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.messsage });
  }
}

export default authorize;