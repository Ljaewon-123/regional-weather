<!-- filepath: /Users/andy/Devel/toolback-project/gridstack.js/demo/GridItemComponent.vue -->
<template>
  <button @click="handleRemove">X</button>
  <p>Vue Grid Item {{ itemId }}</p>
</template>

<script setup lang="ts">
const props = defineProps<{
  itemId: string | number
}>()

const emit = defineEmits<{
  remove: [void]
}>()

const { itemId } = toRefs(props);

onBeforeUnmount(() => {
  console.log(`In vue onBeforeUnmount for item ${itemId.value}`);
});

function handleRemove() {
  emit('remove');
}
</script>

<style scoped>
/* Add your styles here */
</style>
