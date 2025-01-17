<template>
  <div class="n-card rounded overflow-hidden shadow-lg mb-4 bg-white dark:bg-gray-900 p-1">
    <slot name="title">
      <div v-if="props.title" class="p-2">
        {{ props.title }}
      </div>
    </slot>
    <slot>
      <div>
        say hi?
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>