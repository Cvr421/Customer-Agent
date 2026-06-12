interface FAQItem {
  keywords: string[];
  content: string;
}

// In-memory knowledge base (Can be written to/fetched from DB in full-scale deployment)
const FAQ_KNOWLEDGE_BASE: FAQItem[] = [
  {
    keywords: ["ship", "delivery", "shipping", "country", "usa", "international"],
    content: "Shipping Policy: We ship globally. Standard domestic shipping (USA) takes 3-5 business days and is free on orders over $50. International shipping flat rate is $15 and takes 7-14 business days depending on customs processing."
  },
  {
    keywords: ["return", "refund", "exchange", "money back", "warranty"],
    content: "Return Policy: We offer a 30-day return window. Items must be in brand new, original condition with tags intact. Refunds are returned to the initial payment source within 5-7 banking days. Return shipping labels are provided free for store exchanges."
  },
  {
    keywords: ["hours", "time", "support", "open", "contact", "phone", "email"],
    content: "Support Operations: Human support is online Monday-Friday, 9:00 AM - 6:00 PM EST. You can contact us via email at help@spurecommerce.com or call 1-800-555-SPUR. For automated inquiries, this AI chat remains active 24/7."
  }
];

export function retrieveRelevantKnowledge(query: string): string {
  const normalizedQuery = query.toLowerCase();
  const matchedEntries = FAQ_KNOWLEDGE_BASE.filter(faq =>
    faq.keywords.some(keyword => normalizedQuery.includes(keyword))
  );

  if (matchedEntries.length === 0) {
    return "Generic Knowledge: You are representing a helpful e-commerce boutique store.";
  }

  return matchedEntries.map(entry => entry.content).join("\n");
}