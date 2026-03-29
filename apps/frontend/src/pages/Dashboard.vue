<script setup lang="ts">
import CardCarousel from "../components/Dashboard/CardCarousel.vue"
import StatsView from "../components/Dashboard/StatsView.vue"
</script>

<template>
  <div class="hero">
    <div class="hero-bg-text">CARDVAULT</div>

    <!-- Decorative sparkles -->
    <div class="sparkle" style="top: 15%; left: 12%; font-size: 20px; animation-delay: 0s">✦</div>
    <div class="sparkle" style="top: 25%; right: 14%; font-size: 14px; animation-delay: 0.7s">
      ✦
    </div>
    <div class="sparkle" style="top: 60%; left: 8%; font-size: 10px; animation-delay: 1.2s">✦</div>
    <div class="sparkle" style="top: 55%; right: 10%; font-size: 18px; animation-delay: 0.4s">
      ✦
    </div>

    <div class="hero-label">— YOUR COLLECTION —</div>
    <div class="hero-title">CARD<span>VAULT</span></div>

    <CardCarousel />

    <StatsView />
  </div>
</template>

<style lang="css" scoped>
.hero {
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-bg-text {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--display);
  font-size: clamp(80px, 18vw, 220px);
  color: rgba(0, 0, 0, 0.06);
  white-space: nowrap;
  pointer-events: none;
  letter-spacing: -2px;
  line-height: 1;
}

.hero-label {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink3);
  margin-bottom: 20px;
}

.hero-title {
  font-family: var(--display);
  font-size: clamp(40px, 8vw, 90px);
  letter-spacing: 4px;
  text-align: center;
  line-height: 1;
  margin-bottom: 24px;
  position: relative;
}
.hero-title span {
  color: var(--accent);
}

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

@media (max-width: 640px) {
  .hero {
    height: calc(100svh - 60px);
  }
}
</style>
