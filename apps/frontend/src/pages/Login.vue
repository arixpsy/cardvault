<script setup lang="ts">
import { SignIn } from "@clerk/vue"
</script>

<template>
  <SignIn />
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
</style>
