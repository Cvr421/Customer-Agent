import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 4000,
  DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db',
  
  // Cerebras-specific variables
  CEREBRAS_API_KEY: process.env.CEREBRAS_API_KEY || '',
  CEREBRAS_BASE_URL: process.env.CEREBRAS_BASE_URL || 'https://api.cerebras.ai/v1',
  CEREBRAS_MODEL: process.env.CEREBRAS_MODEL || 'llama-3.3-70b',
  
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 mins
  RATE_LIMIT_MAX: 100, // max 100 hits per window
};

if (!CONFIG.CEREBRAS_API_KEY) {
  console.warn("⚠️ Warning: CEREBRAS_API_KEY is not set in the environment variables.");
}




// import dotenv from 'dotenv';
// dotenv.config();

// export const CONFIG = {
//   PORT: process.env.PORT || 4000,
//   DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db',
//   OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
//   OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4o-mini',
//   RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 mins
//   RATE_LIMIT_MAX: 100, // max 100 hits per window
// };

// if (!CONFIG.OPENAI_API_KEY) {
//   console.warn("⚠️ Warning: OPENAI_API_KEY is not set in the environment variables.");
// }