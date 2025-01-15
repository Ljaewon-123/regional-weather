<template>
  <header class="flex justify-between items-center shadow-lg px-8 p-4">
    <div>{{ 'Current Weather Icon Need' }} 🌦 Regional Weather</div>
    <div class="flex items-center gap-x-32">
      <NuxtLink to="/" >Main</NuxtLink>
      <NuxtLink to="grid" >Grid</NuxtLink>
      <NuxtLink to="test" >Test</NuxtLink>
    </div>
    <div>
      <!-- ClientOnly 이거를 안쓰고 Hydration해결하는 방법도 있는데 빌트인을 안쓸 이유가 따로있나??? -->
      <ClientOnly>
        <ThemeSelector />
      </ClientOnly>
    </div>
  </header>
</template>

<!-- /* ☁⛅⛈🌤🌥🌦🌧🌨🌩🌪🌫 */ -->
