import rateLimit from 'express-rate-limit';
import { CONFIG } from '../config/env';

export const chatRateLimiter = rateLimit({
  windowMs: CONFIG.RATE_LIMIT_WINDOW_MS,
  max: CONFIG.RATE_LIMIT_MAX,
  message: {
    error: "Too many communication requests sent. Please rest your fingers and try again shortly."
  },
  standardHeaders: true,
  legacyHeaders: false,
});