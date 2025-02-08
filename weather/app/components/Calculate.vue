<template>
  <div>
    <p class="text-capitalize mb-1">{{ props.title }}</p>
    <ul>
      <li v-for="(cal, key) in calculates" :key="key" class="flex justify-between">
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full bg-primary"></div>
          <span>{{ key }}</span>
        </div>
        <div class="w-[40px]">
          <span class="mr-1">{{ cal }}</span>
          <span>{{ calculateValueSymbol[key] }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { CalculateWeather } from '~/interface/calculate.interface';
import { WeatherSymbol } from '~/interface/symbol.enum';

interface Props {
  calculates: CalculateWeather | null
  title: string
}

const props = defineProps<Props>()

const calculateValueSymbol = {
  PerceivedTemperature : WeatherSymbol['°C'],
  Precipitation : WeatherSymbol.MM,
  Humidity : WeatherSymbol['%']
}

</script>