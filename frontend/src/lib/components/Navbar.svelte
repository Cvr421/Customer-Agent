<script lang="ts">
  import { Sparkles } from 'lucide-svelte';
  export let onOpenDemo: () => void;
</script>

<header class="w-full px-6 py-4 flex items-center justify-between border-b border-white/5 relative z-50">
  <!-- Brand Identity -->
  <div class="flex items-center gap-2.5 cursor-pointer">
    <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-branin-orange to-branin-amber flex items-center justify-center shadow-[0_0_15px_rgba(217,93,44,0.45)]">
      <Sparkles class="w-4.5 h-4.5 text-white" />
    </div>
    <span class="text-xl font-bold tracking-tight text-white font-sans"> AI Live Chat Agent
</span>
  </div>

  <!-- Centered Navigation -->
  <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
    <button on:click={onOpenDemo} class="hover:text-white transition-colors">AI Agents</button>
    <a href="#solutions" class="hover:text-white transition-colors">Solutions</a>
    <a href="#price" class="hover:text-white transition-colors">Price</a>
  </nav>

  <!-- Navigation CTA Buttons (Matches top right of reference) -->
  <div class="flex items-center gap-3">
    <button class="px-5 py-2 hover:bg-white/5 rounded-full text-xs font-semibold text-slate-300 hover:text-white transition-all">
      Sign Up
    </button>
    <button 
      on:click={onOpenDemo}
      class="px-5 py-2 bg-branin-orange hover:bg-[#c24b1f] text-white rounded-full text-xs font-semibold transition-all shadow-[0_4px_12px_rgba(217,93,44,0.3)]"
    >
      Login
    </button>
  </div>
</header>