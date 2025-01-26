<template>
  <header class="flex justify-between items-center px-8 p-2 sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border">
    <div>{{ 'Current Weather Icon Need' }} 🌦 Regional Weather</div>
    <div class="flex items-center gap-x-32">
      <NuxtLink :to="localePath('/')" >Main</NuxtLink>
      <NuxtLink :to="localePath('grid')" >Grid</NuxtLink>
      <NuxtLink :to="localePath('test')" >Test</NuxtLink>
    </div>
    <NLang/>
    <div class="flex items-center gap-4">
      
      <NPalette/>
      <!-- client component 이거를 안쓰고 Hydration해결하는 방법도 있는데 빌트인을 안쓸 이유가 따로있나??? -->
      <!-- <ClientOnly> -->
      <ThemeSelector />
      <!-- </ClientOnly> -->
    </div>
  </header>
</template>

<!-- /* ☁⛅⛈🌤🌥🌦🌧🌨🌩🌪🌫 */ -->

<script setup lang="ts">
const localePath = useLocalePath()
</script>