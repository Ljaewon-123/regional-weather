<template>
  <div>
    <LineChart
      :data="data"
      index="created_at"
      :categories="['Perceived Temperature', 'Humidity']"
      :y-formatter="(tick, i) => {
        return typeof tick === 'number'
          ? `${new Intl.NumberFormat('ko-KR').format(tick).toString()}`
          : ''
      }"
    />
    <Button>Test some btn</Button>
  </div>
</template>

<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false
  }).format(date).replace(/(\.\s*)/g, '-').replace(' ', 'T').slice(0, 16);
}

const data = [
  {
    'created_at': formatDate('2025-02-01T00:00:15.763Z'),
    'Perceived Temperature': 2,
    'Humidity': 95,
  },
  {
    'created_at': formatDate('2025-02-01T03:00:16.071Z'),
    'Perceived Temperature': 4,
    'Humidity': 85,
  },
  {
    'created_at': formatDate('2025-02-01T06:00:15.951Z'),
    'Perceived Temperature': 5,
    'Humidity': 75,
  },
  {
    'created_at': formatDate('2025-02-01T09:00:19.400Z'),
    'Perceived Temperature': 5,
    'Humidity': 75,
  },
  {
    'created_at': formatDate('2025-02-01T12:00:17.800Z'),
    'Perceived Temperature': 3,
    'Humidity': 85,
  },
  {
    'created_at': formatDate('2025-02-01T15:00:06.637Z'),
    'Perceived Temperature': -1,
    'Humidity': 95,
  },
  {
    'created_at': formatDate('2025-02-01T18:00:16.211Z'),
    'Perceived Temperature': -2,
    'Humidity': 95,
  },
  {
    'created_at': formatDate('2025-02-01T21:00:17.784Z'),
    'Perceived Temperature': -2,
    'Humidity': 95,
  },
  {
    'created_at': formatDate('2025-02-02T00:00:17.695Z'),
    'Perceived Temperature': 0,
    'Humidity': 95,
  },
  {
    'created_at': formatDate('2025-02-02T03:00:16.416Z'),
    'Perceived Temperature': 2,
    'Humidity': 90,
  },
  {
    'created_at': formatDate('2025-02-02T06:00:17.647Z'),
    'Perceived Temperature': 8,
    'Humidity': 55,
  },
]
</script>
