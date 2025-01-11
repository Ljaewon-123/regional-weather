<template>
<div>
  <div class="p-4 pb-2 cursor-pointer flex justify-center" style="width: 100px;">
    <span>{{ currentIcon }}</span>

    <!-- <select
      v-model="colorMode.preference"
      class="border w-24 h-8 dark:bg-gray-900 dark:text-white dark:border-gray-700"
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select> -->
    <div class="absolute right-16 z-50 rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden  w-36 py-1 text-sm text-slate-700 font-semibold dark:bg-gray-900 dark:ring-0 dark:highlight-white/5 dark:text-slate-300 mt-8">
      <div v-for="mode in modes" class="py-1 px-2 flex items-center cursor-pointer text-capitalize text-sky-500">
        {{ modeIcons[mode] }}  {{ mode }}
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
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
const nextMode = computed<ColorMode>(() => {
  const currentMode = colorMode.preference as ColorMode
  const currentModeIndex = modes.indexOf(currentMode)
  if(currentModeIndex >= modes.length) return "system"

  return modes[currentModeIndex] ?? 'system'
})
const currentIcon = computed(() => modeIcons[colorMode.preference as ColorMode])
const toggleMode = () => colorMode.preference = nextMode.value
</script>

<style lang="css" scoped>

</style>