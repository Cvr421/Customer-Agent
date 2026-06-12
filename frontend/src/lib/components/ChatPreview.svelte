<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { Send, RefreshCw, Server, Shield, AlertCircle } from 'lucide-svelte';

  interface Message {
    sender: 'user' | 'assistant';
    text: string;
  }

  export let activeSession: boolean = false;
  export let onClose: () => void;

  const API_BASE = import.meta.env.VITE_BACKEND_URL;
  //  const API_BASE = 'http://localhost:4000/chat';

  // Demo Interactive Datasets (Matches assignment criteria)
  let messages: Message[] = [
    { sender: 'user', text: "Do you ship to the USA?" },
    { sender: 'assistant', text: "Yes, we currently ship to over 40 countries including the USA. Standard shipping takes 3-5 days." },
    { sender: 'user', text: "What is your return policy?" },
    { sender: 'assistant', text: "Returns are accepted within 30 days of delivery. Return shipping is free for store exchanges!" }
  ];

  let currentInput = '';
  let isSending = false;
  let isTyping = false;
  let sessionId: string | null = null;
  let globalError: string | null = null;
  let chatWindow: HTMLElement;

  onMount(() => {
    sessionId = localStorage.getItem('spur_chat_session');
    if (activeSession && sessionId) {
      loadHistory();
    }
  });

  function scrollToBottom() {
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }

  afterUpdate(() => {
    scrollToBottom();
  });

  async function loadHistory() {
    if (!sessionId) return;
    try {
      const res = await fetch(`${API_BASE}/history/${sessionId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.history && data.history.length > 0) {
        messages = data.history.map((item: any) => ({
          sender: item.sender,
          text: item.text
        }));
      }
    } catch {
      localStorage.removeItem('spur_chat_session');
      sessionId = null;
    }
  }

  async function sendMessage() {
    const query = currentInput.trim();
    if (!query || isSending) return;

    globalError = null;
    messages = [...messages, { sender: 'user', text: query }];
    currentInput = '';
    isSending = true;
    isTyping = true;

    try {
      const res = await fetch(`${API_BASE}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, sessionId })
      });

      if (!res.ok) throw new Error("Could not connect to the local Cerebras service.");
      const data = await res.json();

      if (data.sessionId) {
        sessionId = data.sessionId;
        localStorage.setItem('spur_chat_session', data.sessionId);
      }

      messages = [...messages, { sender: 'assistant', text: data.reply }];
    } catch (err: any) {
      globalError = err.message || "Failed to reach endpoint.";
      messages = [...messages, { 
        sender: 'assistant', 
        text: "⚡ Telemetry offline. Check if your backend is running on port 4000." 
      }];
    } finally {
      isSending = false;
      isTyping = false;
    }
  }

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function resetSession() {
    localStorage.removeItem('spur_chat_session');
    sessionId = null;
    messages = [
      { sender: 'user', text: "Do you ship to the USA?" },
      { sender: 'assistant', text: "Yes, we currently ship to over 40 countries including the USA. Standard shipping takes 3-5 days." }
    ];
    globalError = null;
  }

// Premium, safe markdown-to-HTML parser matching ChatGPT's design elements
  function parseMarkdown(text: string): string {
    if (!text) return '';

    // 1. Escape HTML entities first to protect against XSS injection
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // 2. Parse inline code/string blocks: `string` -> stylized monospaced capsules
    html = html.replace(/`(.*?)`/g, '<code class="bg-white/10 text-orange-300 font-mono text-[10.5px] px-1.5 py-0.5 rounded border border-white/5">$1</code>');

    // 3. Process the text line-by-line to parse block-level structures
    const lines = html.split('\n');
    let processedLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // A. Parse Headings (e.g., ### Heading, ## Heading, # Heading)
      if (line.startsWith('### ')) {
        line = `<h4 class="font-bold text-white text-xs mt-3 mb-1 uppercase tracking-wider">${line.substring(4)}</h4>`;
      } else if (line.startsWith('## ')) {
        line = `<h3 class="font-bold text-white text-sm mt-4 mb-2 border-b border-white/5 pb-1">${line.substring(3)}</h3>`;
      } else if (line.startsWith('# ')) {
        line = `<h2 class="font-extrabold text-white text-base mt-4 mb-2 border-b border-white/5 pb-1">${line.substring(2)}</h2>`;
      }

      // B. Parse Bullet Lists (lines starting with "- " or "* ")
      // We convert standard bullets into flex containers with custom amber bullet dots
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
      if (isBullet) {
        const content = line.replace(/^\s*[-*]\s+/, '');
        line = `<div class="flex items-start gap-2 my-1.5 pl-2">
                  <span class="text-branin-orange mt-1.5 shrink-0 select-none text-[8px]">●</span>
                  <span class="text-slate-300">${content}</span>
                </div>`;
      }

      processedLines.push(line);
    }

    html = processedLines.join('\n');

    // 4. Parse inline bold elements: **text** -> vibrant branding amber bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#e17233]">$1</strong>');

    return html;
  }

</script>

<div class="bg-[#120c08]/95 border border-branin-orange/40 rounded-2xl p-5 shadow-[0_12px_45px_rgba(217,93,44,0.2)] backdrop-blur-md flex flex-col h-[460px] justify-between font-sans relative z-40">
  
  <!-- Header -->
  <div class="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
    <div class="flex items-center gap-2 text-slate-300 font-mono text-[10px]">
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span>Spur Customer Agent</span>
    </div>
    <div class="flex items-center gap-2">
      <button on:click={resetSession} title="Reset Logs" class="p-1 hover:bg-white/5 text-slate-400 hover:text-white rounded">
        <RefreshCw class="w-3.5 h-3.5" />
      </button>
      <button on:click={onClose} class="p-1 hover:bg-white/5 text-slate-400 hover:text-white rounded font-bold text-sm">
        ✕
      </button>
    </div>
  </div>

  <!-- Messages Scroll Area -->
  <div 
    bind:this={chatWindow}
    class="flex-1 overflow-y-auto space-y-3.5 pr-1.5 mb-3 text-xs"
  >
    {#each messages as msg}
      <div class="flex {msg.sender === 'user' ? 'justify-end' : 'justify-start'}">
        <div class="rounded-xl px-4 py-3 leading-relaxed max-w-[85%] shadow-md
          {msg.sender === 'user' 
            ? 'bg-branin-orange text-white rounded-tr-none' 
            : 'bg-white/[0.03] text-slate-200 border border-white/5 rounded-tl-none'}"
        >
         {@html parseMarkdown(msg.text)}
        </div>
      </div>
    {/each}

    {#if isTyping}
      <div class="flex justify-start">
        <div class="bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 bg-branin-orange rounded-full animate-bounce" style="animation-delay: 0ms;"></span>
          <span class="w-1.5 h-1.5 bg-branin-orange rounded-full animate-bounce" style="animation-delay: 150ms;"></span>
          <span class="w-1.5 h-1.5 bg-branin-orange rounded-full animate-bounce" style="animation-delay: 300ms;"></span>
        </div>
      </div>
    {/if}
  </div>

  <!-- Footer Input Controls -->
  <div>
    {#if globalError}
      <div class="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] p-2.5 rounded-lg mb-2 flex items-center gap-1.5">
        <AlertCircle class="w-3.5 h-3.5" />
        <span class="truncate">{globalError}</span>
      </div>
    {/if}

    <form on:submit|preventDefault={sendMessage} class="flex items-center gap-2">
      <input 
        type="text"
        placeholder="Type a support message..."
        bind:value={currentInput}
        on:keydown={handleKeyPress}
        disabled={isSending}
        class="flex-1 bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 px-3.5 py-3 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-branin-orange disabled:opacity-50 transition-all"
      />
      <button 
        type="submit"
        disabled={!currentInput.trim() || isSending}
        class="bg-branin-orange hover:bg-[#c24b1f] text-white p-3 rounded-xl transition-all disabled:opacity-40 flex items-center justify-center shrink-0 shadow-lg"
      >
        <Send class="w-4 h-4" />
      </button>
    </form>
  </div>

</div>