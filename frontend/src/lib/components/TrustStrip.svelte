<script lang="ts">
  import { Activity, ShieldCheck, Zap } from 'lucide-svelte';
</script>

<div class="w-full border-t border-white/5 py-4 px-6 flex flex-col md:flex-row items-center justify-between text-[10px] text-slate-500 font-mono tracking-wider">
  <div class="flex items-center gap-5 mb-2 md:mb-0">
    <div class="flex items-center gap-1.5">
      <Zap class="w-3.5 h-3.5 text-branin-amber" />
      <span>REAL-TIME RESPONSES</span>
    </div>
    <div class="flex items-center gap-1.5">
      <ShieldCheck class="w-3.5 h-3.5 text-emerald-500" />
      <span>CONTEXT-AWARE ANSWERS</span>
    </div>
    <div class="flex items-center gap-1.5">
      <Activity class="w-3.5 h-3.5 text-cyan-500" />
      <span>EASY INTEGRATION</span>
    </div>
  </div>
  <div>
    <span>SPUR FOUNDING ENGINEER SUBMISSION // 2026</span>
  </div>
</div>