<template>
  <div>
    <UseTemplate>
      <Command>
        <CommandInput placeholder="Filter status..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup 
            v-for="guData of props.allUserLocations"
            :key="guData.id"
            :heading="guData.name"
          >
            <CommandItem
              v-for="location of guData.locations"
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
          {{ selectedLocation ? selectedLocation.name : "+ Set location" }}
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[200px] p-0" align="start">
        <StatusList />
      </PopoverContent>
    </Popover>

    <Drawer v-else :open="isOpen" @update:open="(newOpenValue) => isOpen = newOpenValue">
      <DrawerTrigger as-child>
        <Button variant="outline" class="w-[150px] justify-start">
          {{ selectedLocation ? selectedLocation.name : "+ Set location" }}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div class="mt-4 border-t">
          <StatusList />
        </div>
      </DrawerContent>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import type { Gus, Regional } from '~/interface/regional.interface'

const props = withDefaults(defineProps<{
  allUserLocations: Gus[] | null
}>(),{
  allUserLocations: () => []
})

const [UseTemplate, StatusList] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 768px)')

const isOpen = ref(false)
const selectedLocation = defineModel<Regional | null>('location', { default: null })

function onStatusSelect(regional: Regional) {
  selectedLocation.value = regional
  isOpen.value = false
}
</script>