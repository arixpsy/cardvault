<script lang="ts" setup>
import { Plus } from "@lucide/vue"
import { ref } from "vue"
import { useForm, useField } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import { createExpenseSchema, Category } from "@repo/shared"
import Button from "../Common/Button.vue"
import SlidePanel from "../Common/SlidePanel.vue"
import * as Form from "../Form"
import { useCreateExpense } from "../../hooks/useExpenses"

const open = ref(false)
const openPanel = () => (open.value = true)
const closePanel = () => {
  open.value = false
  resetForm()
}

const { mutate: addExpense, isPending } = useCreateExpense()

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(createExpenseSchema),
  initialValues: {
    category: Category.SEALED_PRODUCTS,
    expenseAt: new Date().toISOString().slice(0, 10),
    notes: "",
  },
})

const { value: expenseName, errorMessage: expenseNameError } = useField<string>("expenseName")
const { value: category, errorMessage: categoryError } = useField<string>("category")
const { value: amount, errorMessage: amountError } = useField<number>("amount")
const { value: expenseAt, errorMessage: expenseAtError } = useField<string>("expenseAt")
const { value: notes, errorMessage: notesError } = useField<string>("notes")

const onSubmit = handleSubmit((values) => {
  addExpense({ ...values }, { onSuccess: () => closePanel() })
})
</script>

<template>
  <Button @click="openPanel"><Plus />Add Expense</Button>

  <SlidePanel title="Add Expense" :open="open" @close="closePanel">
    <form @submit.prevent="onSubmit">
      <div class="expense-inputs">
        <Form.Group :error="expenseNameError">
          <Form.Label>Item Name</Form.Label>
          <Form.Input v-model="expenseName" placeholder="E.g Booster Pack, ETB" />
        </Form.Group>

        <Form.Group :error="categoryError">
          <Form.Label>Category</Form.Label>
          <Form.Select v-model="category">
            <option value="SEALED_PRODUCTS">Sealed Products</option>
            <option value="SINGLES">Singles</option>
            <option value="SUPPLIES">Supplies</option>
            <option value="OTHERS">Others</option>
          </Form.Select>
        </Form.Group>

        <Form.Group :error="amountError">
          <Form.Label>Amount ($)</Form.Label>
          <Form.Input v-model="amount" placeholder="0.00" type="number" step="0.01" />
        </Form.Group>

        <Form.Group :error="expenseAtError">
          <Form.Label>Date</Form.Label>
          <Form.Input v-model="expenseAt" type="date" />
        </Form.Group>

        <Form.Group :error="notesError">
          <Form.Label>Notes</Form.Label>
          <Form.Textarea v-model="notes" />
        </Form.Group>
      </div>

      <div class="footer">
        <Button type="button" variant="secondary" @click="closePanel">Cancel</Button>
        <Button type="submit" :loading="isPending">Add Expense</Button>
      </div>
    </form>
  </SlidePanel>
</template>

<style lang="css" scoped>
form {
  display: flex;
  flex-direction: column;
  overflow: auto;
  justify-content: space-between;
  height: 100%;
}

.expense-inputs {
  display: flex;
  flex-direction: column;
  gap: 14px;
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
