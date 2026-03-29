<script setup lang="ts">
const items = [
  {
    src: "https://assets.tcgdex.net/en/me/me02.5/276/low.webp",
  },
  {
    src: "https://assets.tcgdex.net/en/me/me02.5/226/low.webp",
  },
  {
    src: "https://assets.tcgdex.net/en/me/me02.5/236/low.webp",
  },
  {
    src: "https://assets.tcgdex.net/en/me/me02.5/256/low.webp",
  },
  {
    src: "https://assets.tcgdex.net/en/me/me02.5/286/low.webp",
  },
  {
    src: "https://assets.tcgdex.net/en/me/me02.5/216/low.webp",
  },
  {
    src: "https://assets.tcgdex.net/en/me/me02.5/136/low.webp",
  },
  {
    src: "https://assets.tcgdex.net/en/me/me02.5/176/low.webp",
  },
  {
    src: "https://assets.tcgdex.net/en/me/me02.5/246/low.webp",
  },
  {
    src: "https://assets.tcgdex.net/en/me/me02.5/076/low.webp",
  },
]
</script>

<template>
  <div class="scene">
    <div class="carousel">
      <div v-for="(item, index) in items" class="item" :style="{ '--position': index + 1 }">
        <img :src="item.src" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.scene {
  --quantity: v-bind("items.length");
  height: 300px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.scene .carousel {
  position: absolute;
  width: 100px;
  aspect-ratio: 245 / 337;
  top: 25%;
  left: calc(50% - 50px);
  transform-style: preserve-3d;
  transform: perspective(500px);
  animation: autoRun 30s linear infinite;
}

.scene .carousel .item {
  position: absolute;
  inset: 0 0 0 0;
  transform: rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)) translateZ(220px);
}

.scene .carousel .item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes autoRun {
  from {
    transform: perspective (1800px) rotateY(0deg);
  }
  to {
    transform: perspective(1808px) rotateY(360deg);
  }
}
</style>
