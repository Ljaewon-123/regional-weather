<template>
  <div v-click-outside="closeMenu" class="sidebar transition-all duration-300" :class="{ 'left-[-4rem]': !isOpen, 'left-0': isOpen }">
    <div class="flex justify-end items-center 
      rounded-r-full absolute w-6 h-6 left-[60px] top-[16px] 
      border-t-2 border-r-2 border-b-2
      bg-background">
      <Icon 
      @click="isOpen = !isOpen" 
      class="mr-1 text-black dark:text-white cursor-pointer" 
      size="15" 
      :name="isOpen ? 'line-md:chevron-double-left' : 'line-md:chevron-double-right'"/>
    </div>
    <div v-for="item in wrappingItems" :key="item.id"
    @click="newGridWidget(item.itemKey as KindofComponents, item.widget)"
    class="sidebar-icon group cursor-pointer">
      <Icon size="30" :name="item.icon"/>

      <span class="sidebar-tooltip group-hover:scale-100">
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GridAreaExposed, KindofComponents } from '~/interface/grid-area-exposted.interface';

interface WidgetItem { id?: number, x: number, y: number, w: number, h: number }

const wrappingItems = [
  { 
    id: 1, 
    icon: "ic:baseline-area-chart", 
    size: 30, 
    name: 'Area Chart', 
    itemKey: 'NArea' ,
    widget: { x: 2, y: 1, w: 7, h: 8 }
  },
  { 
    id: 2, 
    icon: "ic:baseline-auto-graph", 
    size: 30, 
    name: 'Line Chart', 
    itemKey: 'NLine' ,
    widget: { x: 2, y: 1, w: 7, h: 8 }
  },
  { 
    id: 3, 
    icon: "ic:outline-table-rows", 
    size: 30, 
    name: 'Table', 
    itemKey: 'NTable' ,
    widget: { x: 2, y: 1, w: 10, h: 10 }
  },
  { 
    id: 4, 
    icon: "majesticons:data-line", 
    size: 30, 
    name: 'Average', 
    itemKey: 'averageCalculate' ,
    widget: { x: 1, y: 1, w: 4, h: 3 }
  },
  { 
    id: 5, 
    icon: "majesticons:data-minus-line", 
    size: 30, 
    name: 'Max', 
    itemKey: 'maxCalculate' ,
    widget: { x: 1, y: 1, w: 4, h: 3 }
  },
  { 
    id: 6, 
    icon: "majesticons:data-plus-line", 
    size: 30, 
    name: 'Median', 
    itemKey: 'medianCalculate' ,
    widget: { x: 1, y: 1, w: 4, h: 3 }
  },
]

const isOpen = ref(false)

// 필요한거는 그냥 현재 선택된 컴포넌트임 
// 근데 이게 hash-key로 놓고 하면 될거같은데?? It works
const addComponent = useState<KindofComponents>('grid-item-key', () => 'NEmpty')

const gridarea = useState<GridAreaExposed | null>('grid-area', () => null)
const widgetConfg = useState('grid-widget', () => ({ x: 1, y: 1, w: 5, h: 5 }))

const newGridWidget = async(key: KindofComponents, widget: WidgetItem) => {
  widgetConfg.value = widget
  addComponent.value = key
  await nextTick()
  gridarea.value?.addNewWidget()
}

const closeMenu = () => {
  isOpen.value = false;
};
// setTimeout(() => {
//   gridarea.value?.addNewWidget()
// }, 50000)

// ic:baseline-area-chart
// ic:baseline-auto-graph
// ic:outline-table-rows
// majesticons:data-line
// majesticons:data-minus-line
// majesticons:data-plus-line

// line-md:chevron-double-left
// line-md:chevron-double-right
</script>