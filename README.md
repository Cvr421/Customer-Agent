# AI Customer Support Assistant 

# Spur AI Live Chat Agent

This repository contains a production-minded implementation of an AI-powered customer support platform built as part of the Spur Founding Full-Stack Engineer assignment.

The application simulates a real-world customer support workflow where users can interact with an AI support agent through a modern chat interface. Conversations are persisted, contextualized with domain-specific knowledge, and answered using a Large Language Model (LLM).

## Features

- Real-time AI-powered customer support chat
- Conversation and message persistence using Prisma
- Context-aware responses using conversation history
- Domain knowledge integration for store FAQs
- Session-based conversation management
- Input validation and error handling
- Graceful recovery from LLM failures
- Clean, responsive chat experience

---

## 🛠️ Tech Stack & Key Integrations

*   **Frontend Engine:** SvelteKit + Tailwind CSS + TypeScript + Lucide Icons.
*   **Backend Framework:** Node.js (TypeScript) + Express + Zod (Validation).
*   **Database & ORM:** SQLite + Prisma ORM (Relational, easily portable to PostgreSQL).
*   **Inference Pipeline:** Cerebras API via `openai` SDK wrapper (utilizing `gpt-oss-120b`).
*   **Rate Limiting:** Express-rate-limit tracking to guard endpoints.

---

## 🚀 Quickstart: Step-by-Step Installation

### Part 1: Backend Setup (Express & Database)

1. **Navigate to the backend directory and install dependencies:**
   ```bash
   cd spur-chat-backend
   npm install
   ```

2. **Configure your Environment File:**
   Copy the sample environment template:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and set your Cerebras API key and configurations:
   ```env
   PORT=4000
   DATABASE_URL="file:./dev.db"

   # Cerebras Credentials
   CEREBRAS_API_KEY="csk-YourRealCerebrasKey"
   CEREBRAS_BASE_URL="https://api.cerebras.ai/v1"
   CEREBRAS_MODEL="gpt-oss-120b"
   ```

3. **Deploy Database Schema Migrations:**
   Initialize your local SQLite database and generate the Prisma Client:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Launch the Server:**
   ```bash
   npm run dev
   ```
   The backend will start listening at `http://localhost:4000`.

---

### Part 2: Frontend Setup (SvelteKit)

1. **Navigate to the frontend directory and install dependencies:**
   ```bash
   cd ../spur-chat-frontend
   npm install
   ```

2. **Run SvelteKit Sync:**
   Ensure SvelteKit compiles dynamic types and local path mappings (such as `$lib`):
   ```bash
   npx svelte-kit sync
   ```

3. **Launch the Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5174/` in your browser.

---

## 🔍 How to Test & Verify

### Option A: Using the Frontend UI (Interactive Mode)
1. Open the page in your browser (`http://localhost:5174/`).
2. Click **"Try Demo"** on the hero section or click **"Try Now"** on the floating action card.
3. The right-hand panel will transition into the **Cerebras AI Console**.
4. Send a query like: `"Do you ship to USA?"` or `"What is your return policy?"`.
5. The interface will display the real-time response streams from Cerebras, showing active latency metrics and matched memory-context logs at the top.

### Option B: Raw CLI Verification (CURL)
Run these commands in your terminal to test backend operations directly:

*   **Test 1: Health Check:**
    ```bash
    curl http://localhost:4000/health
    ```
*   **Test 2: Message & Inference Pipeline (Cerebras):**
    ```bash
    curl -X POST http://localhost:4000/chat/message \
         -H "Content-Type: application/json" \
         -d '{"message": "What are your support hours?"}'
    ```

---

## 📐 Architecture & System Design

Our backend is structured into clear, decoupled layers to ensure strict separation of concerns, stability, and maintainability:

```
┌────────────────────────────────────────────────────────┐
│                      Express App                       │
│    (Rate Limiting, CORS, Global Error Handling)        │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Chat Route Handler                   │
│      (Zod Request Schema Parsing & Sanitization)       │
└───────────────────────────┬────────────────────────────┘
                            │
             ┌──────────────┴──────────────┐
             ▼                             ▼
┌────────────────────────┐    ┌──────────────────────────┐
│      FAQ Service       │    │       LLM Service        │
│  (Keyword Context matching) │   │ (Cerebras API completion)│
└────────────────────────┘    └────────────┬─────────────┘
                                           │
                                           ▼
                              ┌──────────────────────────┐
                              │     Database Service     │
                              │ (Prisma Transaction logs)│
                              └──────────────────────────┘
```

### Relational Schema Design
We use a clean relational structure to handle user sessions and message histories securely:

*   **`Conversation`:** Tracks active communication sessions via standard UUID keys and stores timestamp metadata.
*   **`Message`:** Stores individual conversation items (`id`, `conversationId`, `sender` ("user" | "assistant"), `text`, and `timestamp`). It uses a cascade-delete constraint on `conversationId` to ensure database cleanliness during deletions.

---

## 🧠 LLM Prompting & Optimization Strategy

1. **Context Windowing (Memory Controls):**
   To avoid prompt bloating and lower API token costs, the system limits historical logs sent to the model to the **last 8 messages** of the active session. This maintains conversational context without wasting processing tokens.
2. **Dynamic Context Injection (Cost-Efficient RAG):**
   Instead of feeding our entire business rules database into every API call, our `FAQService` acts as a routing selector. It scans user prompts for matching keywords (e.g., *"refund"*, *"ship"*, *"contact"*) and injects **only** the relevant support guidelines into the system prompt.
3. **Hallucination Guardrails:**
   By setting the LLM temperature to a low **`0.3`**, the system encourages precise, factual responses based on our guidelines. The system prompt contains explicit instructions: *“Only answer customer requests using the provided guidelines. If you do not know, ask them to contact email support.”*

---

## ⚖️ Engineering Trade-offs & Future Improvements

### 1. Vector Search (RAG) vs. Keyword Matching
*   *Current Choice:* We implemented a local keyword-matching algorithm for context retrieval. This keeps local dependencies light and runs out of the box without requiring external database setups.
*   *Future Scale:* In a production environment, we would swap the keyword matching engine for a vector database (e.g., `pgvector` or Pinecone) to perform true semantic vector searches. This would allow the model to understand the semantic meaning of questions even if the user uses completely different words.

### 2. SQL Database Engine (SQLite vs. PostgreSQL)
*   *Current Choice:* We chose SQLite for easy local setup, eliminating the need for Docker or localized service installations during evaluations.
*   *Future Scale:* Since we use Prisma, transitioning our schema to a production-grade PostgreSQL cluster simply requires changing the `provider` line in our `schema.prisma` file. This transition would support high-concurrency connection pools.

### 3. Tool Calling / Function Integrations (Actionable Agents)
* We would implement structured JSON tool calling (function declarations) through Cerebras. This would allow our automated assistant to recognize order-tracking inquiries (e.g., *"Where is order #2035?"*) and query active Shopify or Zoho storefront endpoints directly to return live shipping data, rather than just explaining the general shipping policies.