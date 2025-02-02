<template>
  <div>
    <LineChart
      :data="processData"
      index="weather_created_at"
      :categories="props.keys"
      :y-formatter="tick => {
        return typeof tick === 'number'
          ? `${new Intl.NumberFormat('en-US').format(tick).toString()}`
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

const processData = computed(() => {
  //   const keys = props.keys.reduce((acc, current) => {
  //     acc[current] = current
  //     return acc
  //   }, {} as any)

  //   keys['weather_created_at'] = 'weather_created_at'

  // 깔끔하긴한데....
  const keys = Object.fromEntries([...props.keys, 'weather_created_at'].map(k => [k, k]))

  return props.data.map(data => {
    return Object.keys(data).reduce((acc, key) => {
      if (keys[key]) acc[key] = data[key as keyof WeatherData]
      return acc
    }, {} as Record<string, any>)
  })
})


</script>
