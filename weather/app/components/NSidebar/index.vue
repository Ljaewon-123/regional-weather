<template>
  <div class="sidebar transition-all duration-300" :class="{ 'left-[-4rem]': !isOpen, 'left-0': isOpen }">
    <div class="flex justify-end items-center 
      rounded-r-full absolute w-6 h-6 left-[4rem] top-[16px] 
      border-t-2 border-r-2 border-b-2
      background">
      <Icon 
      @click="isOpen = !isOpen" 
      class="mr-1 text-black dark:text-white cursor-pointer" 
      size="15" 
      :name="isOpen ? 'line-md:chevron-double-left' : 'line-md:chevron-double-right'"/>
    </div>
    <div v-for="item in wrappingItems" :key="item.id"
    class="sidebar-icon group">
      <Icon size="30" :name="item.icon"/>

      <span class="sidebar-tooltip group-hover:scale-100">
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const wrappingItems = [
  { id: 1, icon: "ic:baseline-area-chart", size: 30, name: 'Area Chart' },
  { id: 2, icon: "ic:baseline-auto-graph", size: 30, name: 'Line Chart' },
  { id: 3, icon: "ic:outline-table-rows", size: 30, name: 'Table' },
  { id: 4, icon: "majesticons:data-line", size: 30, name: 'Average' },
  { id: 5, icon: "majesticons:data-minus-line", size: 30, name: 'Max' },
  { id: 6, icon: "majesticons:data-plus-line", size: 30, name: 'Median' },
]

const isOpen = ref(false)

// ic:baseline-area-chart
// ic:baseline-auto-graph
// ic:outline-table-rows
// majesticons:data-line
// majesticons:data-minus-line
// majesticons:data-plus-line

// line-md:chevron-double-left
// line-md:chevron-double-right
</script>