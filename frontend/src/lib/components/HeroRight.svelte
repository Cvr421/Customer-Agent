<script lang="ts">
  import { Check, Mail, Sparkles } from 'lucide-svelte';
  export let onCardClick: () => void;
</script>

<div class="relative w-full h-full min-h-[480px] flex items-center justify-center">
  
  <!-- Ambient Backlight Overlay (Underhead Glow) -->
  <div class="absolute w-[24rem] h-[24rem] rounded-full bg-branin-orange/15 blur-[120px] pointer-events-none"></div>

  <!-- Concentric Orbital Wireframe Rings -->
  <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
    <div class="w-[32rem] h-[32rem] border border-branin-orange/10 rounded-full flex items-center justify-center">
      <div class="w-[24rem] h-[24rem] border border-branin-orange/10 rounded-full flex items-center justify-center">
        <div class="w-[16rem] h-[16rem] border border-branin-orange/15 rounded-full"></div>
      </div>
    </div>
  </div>

  <!-- Silhouette Profile Vector SVG -->
  <svg class="absolute w-full max-w-[340px] drop-shadow-[0_0_40px_rgba(217,93,44,0.2)] top-4" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Outer dashed profile lines -->
    <path d="M120,450 C120,400 130,350 140,310 C143,298 141,280 130,270 C105,248 80,220 80,160 C80,80 150,40 230,40 C310,40 340,90 340,160 C340,210 320,240 320,270 C320,290 330,310 335,320 C345,340 350,380 350,450" 
          stroke="url(#headGrad)" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 3" />
          
    <path d="M130,450 C130,410 138,360 148,320 C151,310 147,290 138,280 C115,258 92,230 92,170 C92,100 155,55 230,55 C305,55 328,100 328,170 C328,215 310,245 310,275 C310,295 318,310 322,320 C332,340 338,380 338,450" 
          stroke="url(#headGrad2)" stroke-width="1.5" stroke-opacity="0.45" />

    <!-- Animated internal neural pathways -->
    <path d="M 120 180 Q 160 120 200 180 T 280 180 T 320 180" stroke="#e17233" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.7" class="animate-wave-line-1" />
    <path d="M 110 200 Q 155 140 200 200 T 290 200 T 315 200" stroke="#d95d2c" stroke-width="1.2" stroke-linecap="round" stroke-opacity="0.5" class="animate-wave-line-2" />

    <!-- Pulsating Active Synaptic Nodes -->
    <circle cx="260" cy="150" r="3.5" fill="#e17233" />
    <circle cx="260" cy="150" r="10" stroke="#e17233" stroke-width="1.5" class="animate-pulse-expand-1" />

    <circle cx="200" cy="220" r="3.5" fill="#d95d2c" />
    <circle cx="200" cy="220" r="10" stroke="#d95d2c" stroke-width="1.5" class="animate-pulse-expand-2" />

    <circle cx="290" cy="270" r="3.5" fill="#e17233" />
    <circle cx="290" cy="270" r="10" stroke="#e17233" stroke-width="1.5" class="animate-pulse-expand-3" />

    <defs>
      <linearGradient id="headGrad" x1="230" y1="40" x2="230" y2="450" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#e17233" stop-opacity="0.1"/>
        <stop offset="45%" stop-color="#e17233" stop-opacity="0.8"/>
        <stop offset="85%" stop-color="#d95d2c" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#090705" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="headGrad2" x1="230" y1="55" x2="230" y2="450" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#e17233" stop-opacity="0"/>
        <stop offset="50%" stop-color="#d95d2c" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#090705" stop-opacity="0"/>
      </linearGradient>
    </defs>
  </svg>

  <!-- 
    FLOATING GLASSMORPHISM CARDS STACK:
    Stacked and offset exactly like the reference image on the bottom right.
  -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="absolute bottom-4 right-2 w-full max-w-[340px] flex flex-col gap-3 z-30 font-sans">
    
    <!-- Card 1: Static Glassmorphism (Reports Equivalent) -->
    <div 
      on:click={onCardClick}
      class="bg-white/[0.02] border border-white/5 rounded-2xl p-4 cursor-pointer hover:bg-white/[0.04] hover:border-branin-orange/30 transition-all duration-300"
    >
      <div class="flex items-center gap-3 mb-1.5">
        <div class="w-5.5 h-5.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <Check class="w-3 h-3 text-[#e17233]" />
        </div>
        <h4 class="text-xs font-semibold text-white">Direct Processing</h4>
      </div>
      <p class="text-[11px] text-slate-400 pl-8 leading-relaxed">
        Answers customer questions instantly using company knowledge.
      </p>
    </div>

    <!-- Card 2: Selected Highlight Card (Active Tab Glow Equivalent) -->
    <div 
      on:click={onCardClick}
      class="bg-gradient-to-r from-branin-orange/15 to-transparent border border-branin-orange/50 rounded-2xl p-4 cursor-pointer shadow-[0_8px_30px_rgba(217,93,44,0.15)]"
    >
      <div class="flex items-center gap-3 mb-1.5">
        <div class="w-5.5 h-5.5 rounded-full bg-branin-orange flex items-center justify-center shadow-[0_0_8px_rgba(217,93,44,0.6)]">
          <Check class="w-3 h-3 text-white" />
        </div>
        <h4 class="text-xs font-semibold text-white">Automated Pipeline</h4>
      </div>
      <p class="text-[11px] text-slate-200 pl-8 leading-relaxed">
        Works 24/7 without downtime to resolve incoming inquiries.
      </p>
    </div>

    <!-- Card 3: Reddish-Orange Gradient Action Banner (Try Now equivalent) -->
    <div class="bg-gradient-to-tr from-rose-950/45 via-[#19100a] to-amber-950/20 border border-white/10 rounded-2xl p-4 shadow-2xl relative overflow-hidden">
      <div class="absolute -right-8 -bottom-8 w-20 h-20 bg-branin-orange/20 rounded-full blur-xl"></div>
      <p class="text-[11px] text-slate-300 font-medium leading-relaxed mb-4">
        Deploy intelligent workspace assistants. No fatigue, no errors.
      </p>
      <div class="flex items-center justify-between">
        <span class="text-[9px] text-slate-500 font-mono tracking-wider">SECURE LAYER</span>
        <button 
          on:click={onCardClick}
          class="px-4 py-1.5 bg-white text-black hover:bg-slate-200 text-xs font-bold rounded-full transition-all shadow-md active:scale-95"
        >
         Customer Agent
        </button>
      </div>
    </div>

  </div>
</div>