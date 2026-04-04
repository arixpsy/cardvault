<script lang="ts" setup>
import { Plus } from "@lucide/vue"
import { ref } from "vue"
import Button from "../Common/Button.vue"
import SlidePanel from "../Common/SlidePanel.vue"
import FormGroup from "../Form/FormGroup.vue"
import FormLabel from "../Form/FormLabel.vue"
import FormInput from "../Form/FormInput.vue"
import FormSelect from "../Form/FormSelect.vue"
import FormTextarea from "../Form/FormTextarea.vue"

const open = ref(false)
const openPanel = () => (open.value = true)
const closePanel = () => (open.value = false)
</script>

<template>
  <Button @click="openPanel"> <Plus />Add Expense</Button>

  <SlidePanel title="Add Expense" :open="open" @close="closePanel">
    <div class="expense-form">
      <FormGroup>
        <FormLabel>Item Name</FormLabel>
        <FormInput placeholder="E.g Booster Pack, ETB"></FormInput>
      </FormGroup>

      <FormGroup>
        <FormLabel>Category</FormLabel>
        <FormSelect>
          <option></option>
        </FormSelect>
      </FormGroup>

      <FormGroup>
        <FormLabel>Amount ($)</FormLabel>
        <FormInput placeholder="0.00" type="number"></FormInput>
      </FormGroup>

      <FormGroup>
        <FormLabel>Date</FormLabel>
        <FormInput placeholder="0.00" type="date"></FormInput>
      </FormGroup>

      <FormGroup>
        <FormLabel>Notes</FormLabel>
        <FormTextarea />
      </FormGroup>

      <div class="form-footer">
        <Button>Add Expense</Button>
      </div>
    </div>
  </SlidePanel>
</template>

<style lang="css" scoped>
.expense-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
  overflow: auto;
}

.form-footer {
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding-top: 12px;
  background: var(--surface);
}
</style>
