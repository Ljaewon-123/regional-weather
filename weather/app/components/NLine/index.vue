<template>
  <div>
    <LineChart
      :data="props.data"
      index="weather_created_at"
      :categories="props.keys"
      :y-formatter="tick => {
        return typeof tick === 'number'
          ? `${new Intl.NumberFormat('ko-KR').format(tick).toString()}`
          : ''
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'
import type { WeatherData } from '~/interface/weather.interface';

interface Props {
  data: WeatherData[], 
  keys: (keyof WeatherData)[]
}

const props = withDefaults(defineProps<Props>(),{
  data: () => []
})

</script>
