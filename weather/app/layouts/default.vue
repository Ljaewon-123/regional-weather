<template>
  <div>
    <header class="flex justify-between items-center mt-5">
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      
      <!-- <ClientOnly> -->
        <ColorModeSelector/>
      <!-- </ClientOnly> -->
    </header>
    <slot></slot>
  </div>
</template>

<style>
body {
  font-family: 'Roboto';
}
body{
  @apply bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300
}
</style>