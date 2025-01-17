<template>
  <div class="p-4 flex flex-col gap-3"> 
    <div class="flex items-center gap-3">
      <p>Location</p>
      <div>
        <UseTemplate>
          <Command>
            <CommandInput placeholder="Filter status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  v-for="location of allUseLocations"
                  :key="location.id"
                  :value="location.name"
                  @select="onStatusSelect(location)"
                >
                  {{ location.name }}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </UseTemplate>

        <Popover v-if="isDesktop" v-model:open="isOpen">
          <PopoverTrigger as-child>
            <Button variant="outline" class="w-[150px] justify-start">
              {{ selectedStatus ? selectedStatus.name : "+ Set location" }}
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0" align="start">
            <StatusList />
          </PopoverContent>
        </Popover>

        <Drawer v-else :open="isOpen" @update:open="(newOpenValue) => isOpen = newOpenValue">
          <DrawerTrigger as-child>
            <Button variant="outline" class="w-[150px] justify-start">
              {{ selectedStatus ? selectedStatus.name : "+ Set location" }}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div class="mt-4 border-t">
              <StatusList />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
    <div>
      <Button @click="testShowThrow">Throw show</Button>
      <Button @click="testCreateThrow">Throw create</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Regional } from '~/interface/regional.interface'


const { data: allUseLocations, error } = await useFetch<Regional[]>('/api/locations')

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



/**
* example
*/
const [UseTemplate, StatusList] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 768px)')

const isOpen = ref(false)
const selectedStatus = ref<Regional | null>(null)

function onStatusSelect(regional: Regional) {
  selectedStatus.value = regional
  isOpen.value = false
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
