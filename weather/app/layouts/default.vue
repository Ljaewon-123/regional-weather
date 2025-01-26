<template>
  <div class="h-screen dark:text-white">
    <NHeader />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  useHead({
    htmlAttrs:{
      class: ''
    }
  })
</script>