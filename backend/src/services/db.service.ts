import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function createConversation(): Promise<string> {
  const conversation = await prisma.conversation.create({ data: {} });
  return conversation.id;
}

export async function checkConversationExists(id: string): Promise<boolean> {
  const count = await prisma.conversation.count({ where: { id } });
  return count > 0;
}

export async function saveMessage(conversationId: string, sender: 'user' | 'assistant', text: string) {
  return prisma.message.create({
    data: {
      conversationId,
      sender,
      text,
    },
  });
}

export async function getConversationHistory(conversationId: string, limit: number = 10) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { timestamp: 'asc' },
    take: -limit, // Retrieves the latest N records while maintaining chronological order
  });
}

export async function getFullHistory(conversationId: string) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { timestamp: 'asc' },
  });
}