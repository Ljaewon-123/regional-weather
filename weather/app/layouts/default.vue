<template>
  <div class="bg-white dark:bg-gray-800 dark:text-white">
    <header class="flex justify-between items-center">
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div class="mr-24">
        <!-- ClientOnly 이거를 안쓰고 Hydration해결하는 방법도 있는데 빌트인을 안쓸 이유가 따로있나??? -->
        <ClientOnly>
          <ThemeSelector />
        </ClientOnly>
      </div>
    </header>
    <slot></slot>
  </div>
</template>

