<template>
  <div >
    <!-- <a href="./index.html">Back to All Demos</a> -->
    <h1>Vue3: Gridstack Controls Vue Rendering Grid Items</h1>
    <p>
      <strong>Use Vue3 render functions with GridStack.renderCB</strong><br />
      GridStack handles widget creation and Vue handles rendering the content
      using the modern (since V11) GridStack.renderCB.
    </p>
    <p>Helpful Resources:</p>
    <ul>
      <li>
        <a
          href="https://vuejs.org/guide/extras/render-function.html#render-functions-jsx"
          target="_blank"
          >Vue Render Functions</a
        >
      </li>
    </ul>
    <button type="button" @click="addNewWidget">Add Widget</button> {{ info }}
    <div class="grid-stack"></div>
  </div>
</template>

<script setup lang="ts">
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import GridItem from '~/components/GridItem.vue';
import { render } from 'vue'; // Unlike the [h] function, the [render] function is not included in the auto-import feature.
//import { GridStack, type GridStackNode, Utils } from 'gridstack';
//import type { GridStackOptions, GridItemHTMLElement } from 'gridstack'
//import type { GridStackWidget } from 'gridstack'
interface WidgetItems { id: number, x: number, y: number, w?: number, h?: number }

const info = ref('');
let grid: GridStack | null = null;
const widgetItems = ref<WidgetItems[]>([
  { id: 1, x: 2, y: 1, h: 2 },
  { id: 2, x: 2, y: 4, w: 3 },
  { id: 3, x: 4, y: 2 },
  { id: 4, x: 3, y: 1, h: 2 },
  { id: 5, x: 0, y: 6, w: 2, h: 2 },
]);
const count = ref(widgetItems.value.length);
const shadowDom:any = {};

onMounted(() => {
  grid = GridStack.init({
    float: true,
    cellHeight: '70px',
    minRow: 1,
  });

  // Listen for remove events to clean up Vue renders
  grid.on('removed', function (event: any, items: any[]) {
    items.forEach((item:any) => {
      if (shadowDom[item.id]) {
        render(null, shadowDom[item.id]);
        delete shadowDom[item.id];
      }
    });
  });

  GridStack.renderCB = function (el: Element, widget: { id: any; }) {
    // el: HTMLElement div.grid-stack-item-content
    // widget: GridStackWidget

    const gridItemEl = el.closest('.grid-stack-item'); // div.grid-stack-item (parent of el)

    // Create Vue component for the widget content
    const itemId = widget.id;
    const widgetNode = h(GridItem, {
      itemId: itemId as any,
      onRemove: () => {
        if(!grid) throw Error('null grid object')
        // Catch the remove event from the Vue component
        grid.removeWidget(gridItemEl as any); // div.grid-stack-item
        info.value = `Widget ${itemId} removed`;
      },
    });
    shadowDom[itemId as any] = el;
    render(widgetNode, el); // Render Vue component into the GridStack-created element
  };

  grid.load(widgetItems.value);
});

onBeforeUnmount(() => {
  // Clean up Vue renders
  Object.values(shadowDom).forEach((el: any) => {
    render(null, el);
  });
});

function addNewWidget() {
  if(!grid) throw Error('null grid object')
  const node = widgetItems.value[count.value] || {
    id: null,
    x: Math.round(12 * Math.random()),
    y: Math.round(5 * Math.random()),
    w: Math.round(1 + 3 * Math.random()),
    h: Math.round(1 + 3 * Math.random()),
  };
  node.id = count.value++
  grid.addWidget(node);
  info.value = `Widget ${node.id} added`;
}
</script>

<!-- <style>
/* cannot have scoped or else you see nothing 
alternatively import the styles in the script section. */
@import 'assets/demo.css';
</style> -->
