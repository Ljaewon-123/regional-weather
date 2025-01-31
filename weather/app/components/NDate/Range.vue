<template>
  <div class="flex gap-4 items-center">
    <NDate v-model="startDate" />
    -
    <NDate v-model="endDate" />
  </div>
</template>

<script setup lang="ts">
import {
  type DateValue,
} from '@internationalized/date'

const startDate = defineModel<DateValue>('startDate')
const endDate = defineModel<DateValue>('endDate')

</script>