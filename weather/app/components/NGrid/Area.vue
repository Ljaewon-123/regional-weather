<template>
  <div>
    <!-- <button type="button" @click="addNewWidget">Add Widget</button>  -->
    <div class="grid-stack"></div>
  </div>
</template>

<script setup lang="ts">
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import Wrapper from '~/components/NGrid/Wrapper.vue';
import { render } from 'vue'; // Unlike the [h] function, the [render] function is not included in the auto-import feature.
// import NEmpty from '~/components/NEmpty.vue';
// import { GridStack, type GridStackNode, Utils } from 'gridstack';
// import type { GridStackOptions, GridItemHTMLElement } from 'gridstack'
// import type { GridStackWidget } from 'gridstack'
interface WidgetItem { id?: number, x: number, y: number, w?: number, h?: number }

let grid: GridStack | null = null;

const count = ref(0);
const shadowDom:any = {};

interface Props {
  innerComponent: () => void
  widgetConfig?: WidgetItem
  addWidgetTrigger?: number // 상위보다 먼(헤더, 사이드바)에서 특정 내부 컴포넌트를 트리거할 방법??
  // defineExpose이거는 바로 상위에서만, 보장될때는 확실하게 유용함 
}

defineExpose({
  addNewWidget
})

const props = defineProps<Props>()

const { addWidgetTrigger } = toRefs(props);

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

  // grid.addWidget이 실행될때 한번 실행
  GridStack.renderCB = function (el: Element, widget: any) {
    // el: HTMLElement div.grid-stack-item-content
    // widget: GridStackWidget

    const gridItemEl = el.closest('.grid-stack-item'); // div.grid-stack-item (parent of el)

    // Create Vue component for the widget content
    const itemId = widget.id;
    const widgetNode = h(Wrapper, {
        itemId: itemId as any,
        onRemove: () => {
          if(!grid) throw Error('null grid object')
          // Catch the remove event from the Vue component
          grid.removeWidget(gridItemEl as any); // div.grid-stack-item
        },
      },
      {
        default: props.innerComponent
      }
    );
    shadowDom[itemId as any] = el;
    render(widgetNode, el); // Render Vue component into the GridStack-created element
  };

  /**
   * When you used slot you see this Wran
   * Wrapper.vue:55 
    [Vue warn]: Slot "default" invoked outside of the render function: 
    this will not track dependencies used in the slot. 
    Invoke the slot function inside the render function instead. 
   * Is mean you use h render only GridStack.renderCB 
   * renderCB outside can't dependencies h components
   */
  // grid.load(widgetItems.value as any);
});

onBeforeUnmount(() => {
  // Clean up Vue renders
  Object.values(shadowDom).forEach((el: any) => {
    render(null, el);
  });
});

// watchEffect(() => addNewWidget())
watch(addWidgetTrigger, () => {
  addNewWidget()
})

function addNewWidget() {
  if(!grid) throw Error('null grid object')
  const node = toRaw(props.widgetConfig) || {
    id: null,
    x: 1,
    y: 1,
    w: 5,
    h: 5,
  };
  node.id = count.value++

  // node가 프록시면 안되거든? 일단?? 근데 애는 프록시임 그래서 생긴문제같은데 => 해결함 
  // console.log(node, '@@node')
  grid.addWidget(node as any);
}
</script>

<!-- <style>
/* cannot have scoped or else you see nothing 
alternatively import the styles in the script section. */
@import 'assets/demo.css';
</style> -->
