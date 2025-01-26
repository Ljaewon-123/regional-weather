<template>
  <div class="p-4 flex flex-col gap-3"> 
    <div class="flex items-center gap-3">
      <p>Location</p>
      <NLocations :all-user-locations="allUseLocations" />
    </div>
    <div>
      <Button @click="testShowThrow">Throw show</Button>
      <Button @click="testCreateThrow">Throw create</Button>
      {{ theme }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Gus, Regional } from '~/interface/regional.interface'

const theme = useTheme()

const { data: allUseLocations, error } = await useFetch<Gus[]>('/api/locations')

const testShowThrow = () => {
  throw showError({
    statusCode: 500,
    statusMessage: "Server Error",
    message: 'Locations Not Found'
  })
}
const testCreateThrow = () => {
  throw createError({
    statusCode: 500,
    statusMessage: "Server Error",
    message: 'Locations Not Found'
  })
}

const localeRoute = useLocaleRoute()
function onClick() {
  const route = localeRoute({ name: 'grid', query: { foo: '1' } })
  if (route) {
    return navigateTo(route.fullPath)
  }
}

</script>

<style scoped lang="postcss">
.badge {
  @apply inline-block bg-gray-200 dark:bg-gray-950 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-400;
  &:hover {
    @apply bg-gray-300;
  }
}

.dark-mode .force-light {
  @apply bg-gray-200 text-gray-700;
}
</style>
