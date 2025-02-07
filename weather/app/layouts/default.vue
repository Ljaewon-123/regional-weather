<template>
  <div>
    <NSidebar />
    <div class="h-screen dark:text-white">
      <NHeader />
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const { theme } = useTheme()
useHead({
  htmlAttrs: computed(() => ({
    class: theme.value.class,
  }))
})
</script>