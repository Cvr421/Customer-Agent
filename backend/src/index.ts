import express from 'express';
import cors from 'cors';
import { CONFIG } from './config/env';
import chatRoutes from './routes/chat.route';
import { chatRateLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors({
  origin: '*', // Customize to restrictive domain settings on staging/production runs
  methods: ['GET', 'POST']
}));

app.use(express.json());

// Apply global rate limiting constraints to chat channels
app.use('/chat', chatRateLimiter);

// Bind system features
app.use('/chat', chatRoutes);

// General health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

app.use(errorHandler);

app.listen(CONFIG.PORT, () => {
  console.log(`🚀 Spur Customer Engagement Agent active on port ${CONFIG.PORT}`);
});