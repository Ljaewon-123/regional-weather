<template>
  <div class="rounded overflow-hidden shadow-lg mb-4 bg-white dark:bg-gray-900">
    <slot name="title">
      <div v-if="props.title" class="p-3">
        {{ props.title }}
      </div>
    </slot>
    <div>
      say hi?
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String
})
</script>