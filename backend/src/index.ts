import express from 'express';
import cors from 'cors';
import { CONFIG } from './config/env';
import chatRoutes from './routes/chat.route';
import { chatRateLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
// Import your Prisma instance and the new LLM warmup helper
import { prisma } from './services/db.service';
import { warmupCerebras } from './services/llm.service';

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

// app.listen(CONFIG.PORT, () => {
//   console.log(`🚀 Spur Customer Engagement Agent active on port ${CONFIG.PORT}`);
// });

app.listen(CONFIG.PORT, async () => {
  console.log(`🚀 Spur Customer Engagement Agent active on port ${CONFIG.PORT}`);
  
  // 1. PERMANENT DATABASE WARMUP: Eagerly spawn and initialize the Prisma Rust Query Engine
  try {
    console.log("⚡ [WARMUP] Initializing Prisma database connection pool...");
    await prisma.$connect();
    console.log("✅ [WARMUP] Prisma Database engine active and ready.");
  } catch (e) {
    console.error("⚠️ [WARMUP] Database eager connection failed:", e);
  }

  // 2. PERMANENT SOCKET WARMUP: Pre-resolve DNS and warm up the TCP/TLS connection to Cerebras
  try {
    console.log("⚡ [WARMUP] Pre-warming Cerebras API connection sockets...");
    warmupCerebras(); // Non-blocking background call
  } catch (e) {
    console.warn("⚠️ [WARMUP] Cerebras eager connection failed:", e);
  }
});