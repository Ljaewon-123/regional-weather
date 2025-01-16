<template>
  <div class="p-4">
    <div class="flex items-center gap-3">
      <p>Location</p>
      <div>
        {{ data }}
      </div>
      <Select >
        <SelectTrigger class="w-[180px] text-capitalize">
          <SelectValue placeholder="Select a Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectLabel>hi?</SelectLabel>
          <SelectGroup>
            <SelectItem 
              :value="'test'" 
              class="text-capitalize"
            >
            test
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    {{ error }}
    <br>
    {{ error?.data }}
    <Button @click="testShowThrow">Throw show</Button>
    <Button @click="testCreateThrow">Throw create</Button>
  </div>
</template>

<script setup lang="ts">

const { data, error } = await useFetch('/api/locations')

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
