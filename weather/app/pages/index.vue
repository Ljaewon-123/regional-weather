<template>
  <div class="p-4 flex flex-col gap-3"> 
    <div class="flex items-center gap-3">
      <p>Location</p>
      <NLocations v-model:location="currentLocation" :all-user-locations="allUseLocations" />
    </div>
    <div>
      <Button @click="testShowThrow">Throw show</Button>
      <Button @click="testCreateThrow">Throw create</Button>
    </div>
    <NDateRange v-model:start-date="startDate" v-model:end-date="endDate" />
    <Button @click="execute">조회</Button>
    <!-- data: {{ data }} -->

    <NCard>
      <NLine 
        :data="data ?? []"
        :keys="[
          'weather_perceived_temperature',
          'weather_precipitation',
          'weather_precipitation_probability',
        ]"
      />
    </NCard>

    <NCard>
      <NArea 
        :data="data ?? []"
        :keys="[
          'weather_humidity',
        ]"
      />
    </NCard>

    <Button @click="maxExecute">Max</Button>
    
    <span class="w-3 h-3 rounded-full bg-primary"></span>
    <NCard class="w-[300px]">
      <ul class="p-4">
        <li v-for="(cal, key) in calculates" :key="key" class="flex justify-between">
          <div class="flex items-center gap-3">
            <div class="w-3 h-3 rounded-full bg-primary"></div>
            <span>{{ key }}</span>
          </div>
          <span>{{ cal }}</span>
        </li>
      </ul>
    </NCard>

    {{ data }}

    <NCard>
      <NTable :table-data="data ?? []"/>
    </NCard>

  </div>
</template>

<script setup lang="ts">
import type { Gus, Regional } from '~/interface/regional.interface'
import type { WeatherData } from '~/interface/weather.interface'

const startDate = ref()
const endDate = ref()
// ref를 사용해도 상관없지만 useState를 한번 사용해봤음
const currentLocation = useState<Regional | null>('regional', () => null)

const { data, execute } = await useFetch<WeatherData[]>(
  '/api/weather',
  {
    query: {
      startDate: startDate,
      endDate: endDate,
      locationId: currentLocation
    }
  }
)

const { data: calculates, execute: maxExecute } = await useFetch(() => `/api/calculate/max`,
{
  query: {
    startDate: startDate,
    endDate: endDate,
    locationId: currentLocation
  }
}
)

const { data: allUseLocations, error } = await useFetch<Gus[]>('/api/locations')

const testShowThrow = () => {
  throw showError({
    statusCode: 500,
    statusMessage: "Server Error",
    message: 'Locations Not Found'
  })
}
const testCreateThrow = () => {
  throw createError({
    statusCode: 500,
    statusMessage: "Server Error",
    message: 'Locations Not Found'
  })
}

const localeRoute = useLocaleRoute()
function onClick() {
  const route = localeRoute({ name: 'grid', query: { foo: '1' } })
  if (route) {
    return navigateTo(route.fullPath)
  }
}

</script>

<style scoped lang="postcss">
.badge {
  @apply inline-block bg-gray-200 dark:bg-gray-950 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-400;
  &:hover {
    @apply bg-gray-300;
  }
}

.dark-mode .force-light {
  @apply bg-gray-200 text-gray-700;
}
</style>
