<template>
  <div>
    <h1>Test Page Here</h1>
    <div class="w-screen">
      <!-- svg가 다하는거 같은데 내가 생각하는건 아니네; -->
      <!-- https://www.youtube.com/watch?v=UgUQSm2JG6Y&list=LL&index=2&t=2s -->
      <svg width="50%" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient">
            <!-- white shows, black hides -->
            <stop offset="0" stop-color="white" stop-opacity="0" />
            <stop offset="0.8" stop-color="white" stop-opacity="1" />
            <stop offset="0.8" stop-color="white" stop-opacity="0" />
          </linearGradient>

          <mask id="gradient-mask">
            <rect class="mask-rect" x="0" y="0" width="100%" height="100%" fill="url(#gradient)" />
          </mask>
        </defs>

        <path d="M0 2C828.225 2 685.929 295 1440 295" stroke="yellow" stroke-width="4" mask="url(#gradient-mask)"/>
        <path d="M0 164C530.184 164 889.809 135 1440 311" stroke="blue" stroke-width="4" mask="url(#gradient-mask)"/>
        <path d="M0 398C786.273 398 603.71 327 1440 327" stroke="red" stroke-width="4" mask="url(#gradient-mask)"/>
      </svg>

    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="css" scoped>
@keyframes slideMask {
  from {
    x: -100%;
  }
  to {
    x: 100%;
  }
}

.mask-rect {
  animation: slideMask 3s ease infinite;
}
</style>