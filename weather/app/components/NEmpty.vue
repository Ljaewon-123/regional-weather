<script setup lang="ts">
import { WeatherWind, weatherWindIcons } from '~/interface/wind.enum';
//  사용처는 gridStack가 끝난 다음에야 할수있다. 
</script>

<template>
<div class="relative flex items-center justify-center h-full w-full">
  <div v-if="true" class="flex flex-col items-center text-gray-500">
    <Icon
      :name="weatherWindIcons[WeatherWind.METEOR]"
      size="200"
      class="absolute top-[80%] opacity-50 transform -translate-y-1/2"
    />
    <p class="text-md font-black font-medium text-gray-500 mt-12">None Data</p>
  </div>
</div>
</template>