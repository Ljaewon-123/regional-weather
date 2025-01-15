<!-- slot를 삭제하고 props로 items을 채우느냐 slot으로 남겨두는냐.. -->
<!-- 매번 전자를 사용했으니 이번엔 후자로 한번 사용해봄 -->
<template>
  <Select v-model="select">
    <SelectTrigger class="text-capitalize">
      <SelectValue :placeholder="props.placeholder" />
    </SelectTrigger>
    <SelectContent>
      <slot>
        <SelectGroup>
          <SelectLabel>Items</SelectLabel>
          <SelectItem 
            v-for="item in defaultItems" 
            :key="item" 
            :value="item" 
            class="text-capitalize"
          >
            {{ item }}
          </SelectItem>
        </SelectGroup>
      </slot>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
// um... generic script?
const select = defineModel<string>()
const props = defineProps({
  placeholder: {
    type: String,
    default: "Select a Item"
  }
})
const defaultItems = [
  'defulat1',
  'defulat2',
  'defulat3',
]
</script>