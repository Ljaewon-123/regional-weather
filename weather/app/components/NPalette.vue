<template>
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
        <h3 class="font-normal">Colors</h3>
        <div class="grid grid-cols-3 gap-2 py-1.5" >
          <Button v-for="color in colors" :key="color.actionId" 
          @click="clickThemeColor(color)"
          :class="{ 'border-2 border-primary': selectedColor === color.actionId,  }"
          variant="outline" class="inline-flex items-center gap-2 whitespace-nowrap px-3 shadow-sm hover:bg-accent hover:text-accent-foreground py-2 h-8 justify-start px-3">
            <span class="w-5 h-5 rounded-full" :class="color.class"></span> 
            <span class="text-xs capitalize ml-2">
              {{ color.title }}
            </span>
          </Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
interface Color {
  title: string;
  class: string;
  actionId: number;
};
const selectedColor = ref()
const colors: Color[] = [
  { title: "zinc", class: "bg-zinc-500", actionId: 1 },
  { title: "rose", class: "bg-rose-500", actionId: 2 },
  { title: "blue", class: "bg-blue-500", actionId: 3 },
  { title: "green", class: "bg-green-500", actionId: 4 },
  { title: "orange", class: "bg-orange-500", actionId: 5 },
  { title: "red", class: "bg-red-500", actionId: 6 },
  { title: "gray", class: "bg-gray-500", actionId: 7 },
  { title: "yellow", class: "bg-yellow-500", actionId: 8 },
  { title: "violet", class: "bg-violet-500", actionId: 9 },
]

const { theme, setTheme } = useTheme()

const clickThemeColor = (colorObject: Color) => {
  selectedColor.value = colorObject.actionId

  setTheme(colorObject.title)
}

</script>