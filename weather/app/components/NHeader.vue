<template>
<header class="flex justify-between items-center shadow-lg px-8">
  <div>{{ 'Current Weather Icon Need' }} 🌦 Regional Weather</div>
  <div>
    <!-- ClientOnly 이거를 안쓰고 Hydration해결하는 방법도 있는데 빌트인을 안쓸 이유가 따로있나??? -->
    <ClientOnly>
      <ThemeSelector />
    </ClientOnly>
  </div>
</header>
</template>

<!-- /* ☁⛅⛈🌤🌥🌦🌧🌨🌩🌪🌫 */ -->
