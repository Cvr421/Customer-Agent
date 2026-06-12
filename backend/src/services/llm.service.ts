import OpenAI from 'openai';
import { CONFIG } from '../config/env';

// Point the OpenAI client to Cerebras' ultra-fast API gateway
const cerebrasClient = new OpenAI({
  apiKey: CONFIG.CEREBRAS_API_KEY,
  baseURL: CONFIG.CEREBRAS_BASE_URL,
});

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function generateLLMResponse(
  userQuery: string,
  history: { sender: string; text: string }[],
  retrievedContext: string
): Promise<string> {
  if (!CONFIG.CEREBRAS_API_KEY) {
    return "I am currently running in local offline mode. Please configure the CEREBRAS_API_KEY variable to activate real-time intelligence.";
  }

  const systemPrompt = `You are an automated customer satisfaction and support agent representing Spur-Store.
Only answer customer requests using the provided guidelines. If you do not know the answer, politely ask them to contact email support at support@spur-store.com.

CRITICAL FORMATTING RULES:
1. Format your response beautifully using bold headers (**Section Name**) for categorizing items.
2. Use clear line breaks between different policies so that they are highly readable.
3. Use bullet points (using standard " - " indicators) for listings with clean spacing.
4. Keep paragraphs short and concise. Avoid rendering long walls of continuous text.

Domain Guidelines:
${retrievedContext}
`;

  // Standard chat structure
  const messages: ChatMessage[] = [{ role: 'system', content: systemPrompt }];

  // Thread history window
  history.forEach(msg => {
    messages.push({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    });
  });

  // Append current user message
  messages.push({ role: 'user', content: userQuery });

  try {
    const response = await cerebrasClient.chat.completions.create({
      model: CONFIG.CEREBRAS_MODEL,
      messages: messages as any,
      max_tokens: 300,
      temperature: 0.3, // Lower temp for precise domain answers
    });

    return response.choices[0]?.message?.content || "I am having difficulty formulating a response. Please try again.";
  } catch (error: any) {
    console.error("Cerebras API Execution Error:", error);
    throw new Error("Unable to complete prompt through Cerebras. Service may be congested or keys might be misconfigured.");
  }
}