<script lang="ts">
  import { ArrowDown } from 'lucide-svelte';
  export let onTriggerDemo: () => void;
</script>

<div class="flex flex-col justify-center text-left h-full z-10">
  <!-- Sub-Heading Indicator Badge -->
  <div class="inline-flex items-center gap-2 bg-branin-orange/10 border border-branin-orange/20 text-branin-amber text-xs px-3.5 py-1.5 rounded-full font-semibold mb-6 w-fit">
    <span class="w-1.5 h-1.5 rounded-full bg-branin-orange animate-pulse"></span>
    INTELLIGENT SUPPORT NODE
  </div>

  <!-- Main Headline (Tight tracking, extreme bold, matching reference) -->
  <h2 class="text-4.5xl md:text-5.5xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]">
    AI Customer Support, That Never Sleeps.
  </h2>

  <!-- Muted Sub-Description -->
  <p class="text-slate-400 text-sm md:text-base mb-8 max-w-sm leading-relaxed">
    Instantly answer customer questions, reduce support workload, and provide 24/7 assistance using AI.
  </p>

  <!-- CTA Action Frame -->
  <div class="flex items-center gap-4">
    <button 
      on:click={onTriggerDemo}
      class="px-8 py-3.5 bg-branin-orange hover:bg-[#c24b1f] text-white rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 duration-200 shadow-[0_0_20px_rgba(217,93,44,0.3)]"
    >
      Customer Agent
    </button>
  </div>

  <!-- Circular Scroll Track Vector (Lower Left Element in reference) -->
  <div class="mt-14 flex items-center gap-3 text-slate-500 font-mono text-[10px]">
    <div class="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center relative bg-white/[0.01]">
      <ArrowDown class="w-3.5 h-3.5 text-branin-orange animate-bounce" />
    </div>
    <div class="flex flex-col">
      <span class="text-slate-400 font-semibold tracking-wider">SYSTEM DIAGNOSTICS</span>
      <div class="flex gap-1 mt-1">
        <span class="w-1.5 h-1.5 rounded-full bg-branin-orange"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
      </div>
    </div>
  </div>
</div>