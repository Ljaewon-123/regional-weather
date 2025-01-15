<template>
  <div class="p-4 flex">
    <div class="max-w-sm rounded overflow-hidden shadow-lg mb-4 bg-white dark:bg-gray-900">
      <img
        class="w-full"
        src="https://tailwindcss.com/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div class="px-6 py-4 pb-2">
        <div class="font-bold text-xl mb-2 dark:text-white">The Coldest Sunset</div>
        <p class="text-gray-700 dark:text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      <div class="px-6 py-4">
        <span class="badge mr-2">#photography</span>
        <span class="badge mr-2">#travel</span>
        <span class="badge">#winter</span>
      </div>
      <div class="px-6 py-4 dark-mode">
        <span class="badge mr-2">#staysdark</span>
        <span class="badge force-light">#stayslight</span>
      </div>
    </div>
    <div  class="flex flex-wrap">
      <NCard v-for="_ in 10">
        <NCardTitle>
          hi title
        </NCardTitle>
      </NCard>
    </div>
    <!-- 유용 -->
    <div class="flex flex-row">
      <div class="basis-1/4">01</div>
      <div class="basis-1/4">02</div>
      <div class="basis-1/2">03</div>
      <div>
        <p>programmatically local pages</p>
        <Button variant="destructive" @click="onClick">Locale router</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
