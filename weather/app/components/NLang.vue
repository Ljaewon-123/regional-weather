<template>
  <Select v-model="select" @update:modelValue="switchLang">
    <SelectTrigger class="w-[130px] text-capitalize">
      <SelectValue placeholder="Select a Language" />
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
const i18nLanguage = useCookie<Lang>('i18n_redirected')
const languages: { title: string, value: Lang }[] = [
  { title: 'english', value: 'en'},
  { title: 'korean', value: 'ko'}
] 
const select = ref<Lang>(i18nLanguage.value)

const switchLang = (lang: string) => setLocale(lang as Lang)
</script>