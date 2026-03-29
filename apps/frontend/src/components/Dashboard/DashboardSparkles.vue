<template>
  <div class="sparkle" style="top: 15%; left: 12%; font-size: 20px; animation-delay: 0s">✦</div>
  <div class="sparkle" style="top: 25%; right: 14%; font-size: 14px; animation-delay: 0.7s">✦</div>
  <div class="sparkle" style="top: 60%; left: 8%; font-size: 10px; animation-delay: 1.2s">✦</div>
  <div class="sparkle" style="top: 55%; right: 10%; font-size: 18px; animation-delay: 0.4s">✦</div>
</template>

<style scoped>
.sparkle {
  position: absolute;
  pointer-events: none;
  animation: sparkleAnim 2s ease-in-out infinite;
}

@keyframes sparkleAnim {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}
</style>
