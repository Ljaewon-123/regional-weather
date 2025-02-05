<template>
  <NCard class="h-full p-4">
    <div class="flex justify-start mb-2">
      <button @click="handleRemove">X</button>
    </div>
    <div>
      <slot/>
    </div>
  </NCard>
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