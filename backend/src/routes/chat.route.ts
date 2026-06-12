import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { 
  createConversation, 
  checkConversationExists, 
  saveMessage, 
  getConversationHistory, 
  getFullHistory 
} from '../services/db.service';
import { retrieveRelevantKnowledge } from '../services/faq.service';
import { generateLLMResponse } from '../services/llm.service';

const router = Router();

const MessagePayloadSchema = z.object({
  message: z.string()
    .min(1, { message: "Prompt context cannot be empty" })
    .max(1000, { message: "Character input overflow threshold exceeded (1000 limit)" }),
  sessionId: z.string().uuid().optional().nullable()
});

// Endpoint 1: Send a message & get dynamic prompt resolution
router.post('/message', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationResult = MessagePayloadSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({ error: validationResult.error.issues[0].message });
      return;
    }

    const { message, sessionId } = validationResult.data;
    let targetSessionId = sessionId;

    // Resolve Session Context
    if (!targetSessionId || !(await checkConversationExists(targetSessionId))) {
      targetSessionId = await createConversation();
    }

    // Capture User input locally before triggering prompt dispatch
    await saveMessage(targetSessionId, 'user', message);

    // Fetch conversation window
    const history = await getConversationHistory(targetSessionId, 8); // Grab latest 8 messages

    // Match Domain Intent
    const context = retrieveRelevantKnowledge(message);

    // Dispatch completion
    let aiResponse = "";
    try {
       aiResponse = await generateLLMResponse(message, history, context);
    } catch (llmError: any) {
       aiResponse = "I'm experiencing difficulty connecting with my core knowledge engines. Our service administrators have been informed.";
    }

    // Persist finalized AI Completion
    await saveMessage(targetSessionId, 'assistant', aiResponse);

    res.status(200).json({
      reply: aiResponse,
      sessionId: targetSessionId
    });

  } catch (error) {
    next(error);
  }
});

// Endpoint 2: Retrieve full transaction history for session rebuilds
router.get('/history/:sessionId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) {
      res.status(400).json({ error: "No session context provided." });
      return;
    }

    const exists = await checkConversationExists(sessionId);
    if (!exists) {
      res.status(404).json({ error: "Session was not located or verified." });
      return;
    }

    const records = await getFullHistory(sessionId);
    res.status(200).json({ history: records });
  } catch (error) {
    next(error);
  }
});

export default router;