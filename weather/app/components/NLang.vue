<template>
  <Select v-model="select" @update:modelValue="switchLang">
    <SelectTrigger class="w-[130px] text-capitalize">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
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
    <p>{{ $t('welcome') }}</p>
  </Select>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const { setLocale } = useI18n()
type Lang = "en" | "ko"
const languages: { title: string, value: Lang }[] = [
  { title: 'english', value: 'en'},
  { title: 'korean', value: 'ko'}
] 
const select = ref<Lang>('en')

const switchLang = (lang: string) => setLocale(lang as Lang)

</script>