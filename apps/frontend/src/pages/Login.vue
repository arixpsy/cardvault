<script setup lang="ts">
import LoginPanel from "../components/Auth/LoginPanel.vue"
</script>

<template>
  <div class="bg-text">CARDVAULT</div>

  <div class="float-card float-card-1"><div class="card-circle"></div></div>
  <div class="float-card float-card-2"><div class="card-circle"></div></div>
  <div class="float-card float-card-3"><div class="card-circle"></div></div>
  <div class="float-card float-card-4"><div class="card-circle"></div></div>

  <LoginPanel />
</template>

<style lang="css">
:root {
  --clerk-color-primary: #2f3037;
  --clerk-color-primary-foreground: #ffffff;
  --clerk-color-danger: #ef4444;
  --clerk-color-success: #22c543;
  --clerk-color-warning: #f36b16;
  --clerk-color-neutral: #000000;
  --clerk-color-foreground: #000000;
  --clerk-color-muted-foreground: #747686;
  --clerk-color-background: #ffffff;
  --clerk-color-input: #ffffff;
  --clerk-color-input-foreground: #000000;
  --clerk-color-ring: #000000;
  --clerk-color-shimmer: #ffffff;
  --clerk-color-modal-backdrop: #000000;
  --clerk-border-radius: 0.375rem;
  --clerk-spacing: 1rem;
}

.dark {
  --clerk-color-primary: #2f3037;
  --clerk-color-primary-foreground: #ffffff;
  --clerk-color-danger: #ef4444;
  --clerk-color-success: #22c543;
  --clerk-color-warning: #f36b16;
  --clerk-color-neutral: #000000;
  --clerk-color-foreground: #000000;
  --clerk-color-muted-foreground: #747686;
  --clerk-color-background: #ffffff;
  --clerk-color-input: #ffffff;
  --clerk-color-input-foreground: #000000;
  --clerk-color-ring: #000000;
  --clerk-color-shimmer: #ffffff;
  --clerk-color-modal-backdrop: #000000;
  --clerk-border-radius: 0.375rem;
  --clerk-spacing: 1rem;
}

.bg-text {
  position: fixed;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--display);
  font-size: clamp(100px, 22vw, 300px);
  color: rgba(0, 0, 0, 0.05);
  white-space: nowrap;
  pointer-events: none;
  letter-spacing: -2px;
  line-height: 1;
  z-index: 0;
}

/* ─── FLOATING CARDS ─── */
.float-card {
  position: fixed;
  width: 120px;
  height: 168px;
  border-radius: 10px;
  pointer-events: none;
  z-index: 0;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.float-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.15) 100%
  );
  z-index: 2;
}

.float-card-1 {
  top: 8%;
  left: 8%;
  background: linear-gradient(145deg, var(--dark), var(--dark2));
  transform: rotate(-18deg);
  animation: drift1 8s ease-in-out infinite;
  opacity: 0;
  animation-delay: 0.6s;
  animation-fill-mode: forwards;
}
.float-card-2 {
  bottom: 12%;
  right: 6%;
  background: linear-gradient(145deg, var(--accent), #4040f0);
  transform: rotate(12deg);
  animation: drift2 9s ease-in-out infinite;
  width: 100px;
  height: 140px;
  opacity: 0;
  animation-delay: 0.8s;
  animation-fill-mode: forwards;
}
.float-card-3 {
  top: 18%;
  right: 12%;
  background: linear-gradient(145deg, var(--gold), var(--gold2));
  transform: rotate(8deg);
  animation: drift3 7s ease-in-out infinite;
  width: 90px;
  height: 126px;
  opacity: 0;
  animation-delay: 1s;
  animation-fill-mode: forwards;
}
.float-card-4 {
  bottom: 18%;
  left: 10%;
  background: linear-gradient(145deg, #1a8c5a, #20b070);
  transform: rotate(-6deg);
  animation: drift4 10s ease-in-out infinite;
  width: 80px;
  height: 112px;
  opacity: 0;
  animation-delay: 1.2s;
  animation-fill-mode: forwards;
}

/* Card inner details */
.float-card::after {
  content: "";
  position: absolute;
  bottom: 8px;
  left: 8px;
  right: 8px;
  height: 24px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  z-index: 1;
}

.card-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  z-index: 1;
}

@keyframes drift1 {
  0%,
  100% {
    transform: rotate(-18deg) translateY(0px);
    opacity: 0.55;
  }
  50% {
    transform: rotate(-15deg) translateY(-14px);
    opacity: 0.65;
  }
}
@keyframes drift2 {
  0%,
  100% {
    transform: rotate(12deg) translateY(0px);
    opacity: 0.45;
  }
  50% {
    transform: rotate(15deg) translateY(-18px);
    opacity: 0.55;
  }
}
@keyframes drift3 {
  0%,
  100% {
    transform: rotate(8deg) translateY(0px);
    opacity: 0.4;
  }
  50% {
    transform: rotate(5deg) translateY(-10px);
    opacity: 0.5;
  }
}
@keyframes drift4 {
  0%,
  100% {
    transform: rotate(-6deg) translateY(0px);
    opacity: 0.35;
  }
  50% {
    transform: rotate(-9deg) translateY(-12px);
    opacity: 0.45;
  }
}
</style>
