<template>
  <NCard class="h-full">
    <div class="flex justify-start ml-3 mt-3">
      <button @click="handleRemove">X</button>
    </div>
    <p>Vue Grid Item {{ itemId }} wrap</p>
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