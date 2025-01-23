<template>
  <header class="flex justify-between items-center px-8 p-2 sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border">
    <div>{{ 'Current Weather Icon Need' }} 🌦 Regional Weather</div>
    <div class="flex items-center gap-x-32">
      <NuxtLink :to="localePath('/')" >Main</NuxtLink>
      <NuxtLink :to="localePath('grid')" >Grid</NuxtLink>
      <NuxtLink :to="localePath('test')" >Test</NuxtLink>
    </div>
    <NLang/>
    <div class="flex items-center gap-4">
      <Popover>
        <PopoverTrigger as-child>
          <Button size="icon" variant="outline">
            <Icon name="mdi:brush-variant"  />
          </Button>
        </PopoverTrigger>
        <PopoverContent style="width: 400px;">
          <div class="p-4">
            <div class="mb-8">
              <h1 class="text-md text-foreground font-semibold">Customize</h1>
              <p class="text-xs text-muted-foreground">Pick up the your color</p>
            </div>
            <div class="grid grid-cols-3 gap-2 py-1.5" >
              <Button v-for="color in colors" variant="outline" class="inline-flex items-center gap-2 whitespace-nowrap px-3 shadow-sm hover:bg-accent hover:text-accent-foreground py-2 h-8 justify-start px-3">
                <span class="w-5 h-5 rounded-full" :class="color.class"></span> 
                <span class="text-xs capitalize">
                  {{ color.title }}
                </span>
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <!-- client component 이거를 안쓰고 Hydration해결하는 방법도 있는데 빌트인을 안쓸 이유가 따로있나??? -->
      <!-- <ClientOnly> -->
      <ThemeSelector />
      <!-- </ClientOnly> -->
    </div>
  </header>
</template>

<!-- /* ☁⛅⛈🌤🌥🌦🌧🌨🌩🌪🌫 */ -->

<script setup lang="ts">
const localePath = useLocalePath()

const colors = [
  { title: "zinc" ,class: "bg-zinc-500" },
  { title: "rose" ,class: "bg-rose-500" },
  { title: "blue" ,class: "bg-blue-500" },
  { title: "green" ,class: "bg-green-500" },
  { title: "orange" ,class: "bg-orange-500" },
  { title: "red" ,class: "bg-red-500" },
  { title: "gray" ,class: "bg-gray-500" },
  { title: "yellow" ,class: "bg-yellow-500" },
  { title: "violet" ,class: "bg-violet-500" },
]

</script>