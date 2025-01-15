<template>
  <Select v-model="select">
    <SelectTrigger class="w-[130px] text-capitalize">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Languages</SelectLabel>
        <SelectItem 
          v-for="lang in languages" 
          :key="lang.value" 
          :value="lang.value" 
          class="text-capitalize"
        >
          {{ lang.title }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Lang = "en" | "ko"
const languages: { title: string, value: Lang }[] = [
  { title: 'english', value: 'en'},
  { title: 'korean', value: 'ko'}
] 
const select = ref<Lang>('en')
</script>