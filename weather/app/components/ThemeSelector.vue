<template>
<div>
  <div @click="clickMode = !clickMode" class="p-4 pb-2 cursor-pointer flex justify-center" style="width: 100px;">
    <span>{{ currentIcon }}</span>

    <div v-if="clickMode" class="absolute right-16 z-50 rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden  w-36 py-1 text-sm text-slate-700 font-semibold dark:bg-gray-900 dark:ring-0 dark:highlight-white/5 dark:text-slate-300 mt-8">
      <div v-for="mode in modes" :key="mode" 
        class="py-1 px-2 flex items-center cursor-pointer text-capitalize"
        :class="mode == colorMode.preference ? 'text-sky-500' : ''"
        @click="toggleMode(mode)"
      >
        {{ modeIcons[mode] }}  {{ mode }}
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
const clickMode = ref(false)
const colorMode = useColorMode()
type ColorMode = "system" | "light" | "dark"
const modes: ColorMode[] = [
  'system', // 0
  'light', // 1
  'dark' // 2
] 
const modeIcons = {
  system: '🌓',
  light: '🌕',
  dark: '🌑'
}

const currentIcon = computed(() => modeIcons[colorMode.preference as ColorMode])
const toggleMode = (mode: ColorMode) => colorMode.preference = mode
</script>

<style lang="css" scoped>

</style>