<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import HeroLeft from "$lib/components/HeroLeft.svelte";
  import HeroRight from "$lib/components/HeroRight.svelte";
  import ChatPreview from "$lib/components/ChatPreview.svelte";
  import TrustStrip from "$lib/components/TrustStrip.svelte";

  // Toggle active console overlay dynamically
  let showChatConsole = false;

  function toggleConsole() {
    showChatConsole = !showChatConsole;
  }
</script>

<!-- Main Navigation -->
<Navbar onOpenDemo={toggleConsole} />

<!-- Main Hero Section (Layout Ratio: Left Content 35% / Right Content 65%) -->
<main class="flex-1 max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-10 relative z-10">
  
  <!-- Left Side: Content Column (Sized strictly to 35% on desktop grid) -->
  <section class="lg:col-span-5 h-full">
    <HeroLeft onTriggerDemo={toggleConsole} />
  </section>

  <!-- Right Side: Graphic Visual Frame (Sized to 65% on desktop grid) -->
  <section class="lg:col-span-7 relative h-full">
    {#if !showChatConsole}
      <HeroRight onCardClick={toggleConsole} />
    {:else}
      <!-- 
        Active Console Interaction Mode:
        Seamlessly replaces the graphics layer with the live Cerebras system preview.
      -->
      <div class="w-full max-w-[450px] mx-auto py-4">
        <ChatPreview activeSession={true} onClose={toggleConsole} />
      </div>
    {/if}
  </section>

</main>

<!-- Unified Bottom Trust Telemetry Badge -->
<TrustStrip />