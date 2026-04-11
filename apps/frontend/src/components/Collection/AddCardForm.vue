<script lang="ts" setup>
import { Condition, Game } from "@repo/shared"
import { ArrowLeft } from "@lucide/vue"
import type { Card } from "@tcgdex/sdk"
import { ref, computed } from "vue"
import Button from "../Common/Button.vue"
import CardImage from "../Common/CardImage.vue"
import * as Form from "../Form"
import { useAddToCollection } from "../../hooks/useCollection"

const props = defineProps<{
  card: Card
}>()

const emit = defineEmits<{
  back: []
  added: []
}>()

const VARIANT_LABELS: Record<string, string> = {
  normal: "Normal",
  reverse: "Reverse Holo",
  holo: "Holo",
  firstEdition: "First Edition",
}

const availableVariants = computed(() => {
  if (!props.card.variants) return []
  return Object.entries(props.card.variants)
    .filter(([, available]) => available === true)
    .map(([key]) => ({ value: VARIANT_LABELS[key] ?? key, label: VARIANT_LABELS[key] ?? key }))
})

const condition = ref<string>(Condition.NM)
const variant = ref<string>(availableVariants.value[0]?.value ?? "")
const useCustomValue = ref(false)
const customValue = ref<string>("")
const notes = ref("")

const { mutate: addCard, isPending } = useAddToCollection()

function onSubmit() {
  addCard(
    {
      game: Game.POKEMON,
      externalId: props.card.id,
      localId: props.card.localId,
      name: props.card.name,
      setId: props.card.set.id,
      setName: props.card.set.name,
      rarity: props.card.rarity ?? undefined,
      imageUrl: props.card.image ? `${props.card.image}` : undefined,
      condition: condition.value as Condition,
      variant: variant.value || undefined,
      customValue:
        useCustomValue.value && customValue.value ? Number(customValue.value) : undefined,
      notes: notes.value || undefined,
    },
    { onSuccess: () => emit("added") },
  )
}
</script>

<template>
  <div class="add-card-form">
    <button class="back-btn" @click="emit('back')">
      <ArrowLeft :size="14" />
      Back to Results
    </button>

    <div class="card-preview">
      <div class="card-image-wrap">
        <CardImage :src="card.image ? `${card.image}/high.webp` : undefined" :alt="card.name" />
      </div>

      <div class="card-details">
        <span class="card-name">{{ card.name }}</span>
        <span class="card-meta">{{ card.set.name }}</span>
        <span class="card-meta">#{{ card.localId }}</span>
        <span v-if="card.rarity" class="card-meta">{{ card.rarity }}</span>
        <div class="card-prices">
          <div class="price-row">
            <span class="price-label">Market (USD)</span>
            <span class="price-value">N/A</span>
          </div>
          <div class="price-row">
            <span class="price-label">Local (SGD)</span>
            <span class="price-value">N/A</span>
          </div>
        </div>
      </div>
    </div>

    <form class="form-body" @submit.prevent="onSubmit">
      <div class="form-fields">
        <Form.Group v-if="availableVariants.length > 0">
          <Form.Label>Variant</Form.Label>
          <Form.Select v-model="variant">
            <option v-for="v in availableVariants" :key="v.value" :value="v.value">
              {{ v.label }}
            </option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Condition</Form.Label>
          <Form.Select v-model="condition">
            <option :value="Condition.NM">Near Mint (NM)</option>
            <option :value="Condition.LP">Lightly Played (LP)</option>
            <option :value="Condition.MP">Moderately Played (MP)</option>
            <option :value="Condition.HP">Heavily Played (HP)</option>
            <option :value="Condition.DMG">Damaged (DMG)</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <div class="toggle-row">
            <Form.Label>Custom Value</Form.Label>
            <label class="toggle">
              <input type="checkbox" v-model="useCustomValue" />
              <span class="toggle-track" />
            </label>
          </div>
          <Form.Input
            v-if="useCustomValue"
            v-model="customValue"
            placeholder="0.00"
            type="number"
            step="0.01"
            min="0"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Textarea v-model="notes" placeholder="Optional notes..." />
        </Form.Group>
      </div>

      <div class="footer">
        <Button type="button" variant="secondary" @click="emit('back')">Cancel</Button>
        <Button type="submit" :loading="isPending">Add to Collection</Button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.add-card-form {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: var(--accent);
  font-family: var(--body);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s;
}

.back-btn:hover {
  opacity: 0.7;
}

.card-preview {
  display: flex;
  gap: 14px;
  background: var(--bg);
  border-radius: 12px;
  padding: 12px;
}

.card-image-wrap {
  flex-shrink: 0;
  width: 110px;
}

.card-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.card-name {
  font-family: var(--body);
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.3;
}

.card-meta {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink3);
  letter-spacing: 0.02em;
}

.card-prices {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-label {
  font-family: var(--mono);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink3);
}

.price-value {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--ink2);
}

.form-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  overflow: auto;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toggle {
  position: relative;
  cursor: pointer;
}

.toggle input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-track {
  display: block;
  width: 36px;
  height: 20px;
  background: var(--surface2);
  border-radius: 10px;
  transition: background 0.2s;
}

.toggle-track::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.2s;
}

.toggle input:checked + .toggle-track {
  background: var(--accent);
}

.toggle input:checked + .toggle-track::after {
  transform: translateX(16px);
}

.footer {
  position: sticky;
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding-top: 12px;
  background: var(--surface);
}
</style>
