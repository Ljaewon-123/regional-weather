<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { WeatherData } from '~/interface/weather.interface'

type TableHead = { title: string, class: string}
| { title: string, class?: never }

interface Props {
  tableData: WeatherData[]
}

const headers: TableHead[] = [
  { title: 'id', class: 'w-[130px]' },
  { title: 'date' },
  { title: 'time' },
  { title: 'wind' },
  { title: 'condition' },
  { title: 'humidity' },
  { title: 'perceived temperature' },
  { title: 'precipitation' },
  { title: 'precipitation probability', class: 'text-right' },
]

const props = withDefaults(defineProps< Props >(), {
  tableData: () => []
})

</script>

<template>
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow class="text-capitalize">
        <TableHead v-for="head in headers" :key="head.title" :class="head?.class">
          {{ head.title }}
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="data in props.tableData" :key="data.weather_id">
        <TableCell class="font-medium">
          {{ data.weather_id }}
        </TableCell>
        <TableCell>{{ data.weather_date }}</TableCell>
        <TableCell>{{ data.weather_time }}</TableCell>
        <TableCell>{{ data.weather_wind }}</TableCell>
        <TableCell>{{ data.weather_weather_condition }}</TableCell>
        <TableCell>{{ data.weather_perceived_temperature }}</TableCell>
        <TableCell >
          {{ data.weather_perceived_temperature }}
        </TableCell>
        <TableCell >
          {{ data.weather_precipitation }}
        </TableCell>
        <TableCell class="text-right">
          {{ data.weather_precipitation_probability }} %
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>