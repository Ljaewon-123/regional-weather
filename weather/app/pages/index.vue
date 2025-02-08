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

    <DevOnly>
      <Button @click="addComponent = 'NLine', newGridWidget()">NLine</Button>
      <Button @click="addComponent = 'NArea', newGridWidget()">NArea</Button>
      <Button @click="addComponent = 'Calculate', newGridWidget()">Calculate</Button>
      <Button @click="addComponent = 'NTable', newGridWidget()">NTable</Button>
    </DevOnly>

    <NGridArea :inner-component="comps[addComponent]" :widget-config="widgetConfg" ref="gridarea" />

  </div>
</template>

<script setup lang="ts">
import type { CalculateWeather } from '~/interface/calculate.interface'
import type { GridAreaExposed, KindofComponents } from '~/interface/grid-area-exposted.interface'
import type { Gus, Regional } from '~/interface/regional.interface'
import type { WeatherData } from '~/interface/weather.interface'

const startDate = ref()
const endDate = ref()
// ref를 사용해도 상관없지만 useState를 한번 사용해봤음
const currentLocation = useState<Regional | null>('regional', () => null)

// const trigger = useState('grid-trigger', () => 0)
const widgetConfg = useState('grid-widget', () => ({ x: 1, y: 1, w: 5, h: 5 }))

// 어? state니까 그냥 써도 되지않나????
const gridarea = useState<GridAreaExposed | null>('grid-area', () => null)
const newGridWidget = async() => {
  if(!gridarea.value) return
  // console.log(gridarea.value)
  await nextTick()
  gridarea.value.addNewWidget()
}

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

const { data: calculates } = await useFetch<CalculateWeather>(() => `/api/calculate/max`,
  {
    query: {
      startDate: startDate,
      endDate: endDate,
      locationId: currentLocation
    }
  }
)

const { data: allUseLocations, error } = await useFetch<Gus[]>('/api/locations')

const comps: Record<KindofComponents, () => VNode> = {
  NLine:() => h(
    resolveComponent('NLine'),
    {
      data: data.value ?? [],
      keys: [
        "weather_perceived_temperature",
        "weather_precipitation",
        "weather_precipitation_probability",
      ],
    }
  ),
  NArea: () => h(resolveComponent("NArea"), {
    data: data.value ?? [],
    keys: ["weather_humidity"],
  }),
  Calculate: () => h(resolveComponent("Calculate"), {
    calculates: calculates.value,
  }),
  NTable: () => h(resolveComponent("NTable"), {
    "table-data": data.value ?? [],
  }),
  NEmpty: () => h(resolveComponent('NEmpty'))
}

const addComponent = useState<KindofComponents>('grid-item-key', () => 'NEmpty')


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
