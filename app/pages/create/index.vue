<script setup>
import { useMutation } from '@tanstack/vue-query'
import { Undo2 } from 'lucide-vue-next'
import { Field, useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { z } from 'zod'

const { t: traducir } = useI18n()

const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.coerce.number().min(0),
  stock: z.coerce.number().min(0),
  category: z.string().min(1),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const { mutate: crearProducto, isPending } = useMutation({
  mutationFn: (body) =>
    fetch('http://localhost:4000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then((r) => r.json()),
  onSuccess: () => {
    toast.success(traducir('api.success.product_created'))
    navigateTo('/clothes')
  },
  onError: () => {
    toast.error(traducir('api.error.internal_server_error'))
  },
})

const onSubmit = handleSubmit((values) => {
  crearProducto(values)
})
</script>

<template>
  <div>
    <div class="mb-10 ml-12">
      <NuxtLink class="inline-block" to="/clothes">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full bg-white/30 shadow-lg backdrop-blur-md transition hover:bg-white/40"
        >
          <Undo2 class="text-black" size="28" />
        </div>
      </NuxtLink>
    </div>

    <div class="mx-auto max-w-xl px-6">
      <h1 class="mb-8 text-2xl font-bold">{{ traducir('product.create.title') }}</h1>

      <form class="flex flex-col gap-4" @submit="onSubmit">
        <Field v-slot="{ field, errorMessage }" name="name">
          <input
            v-bind="field"
            :placeholder="traducir('form.label.name')"
            class="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300"
            type="text"
          />
          <span v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</span>
        </Field>

        <Field v-slot="{ field, errorMessage }" name="description">
          <textarea
            v-bind="field"
            :placeholder="traducir('form.label.description')"
            class="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300"
            rows="3"
          />
          <span v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</span>
        </Field>

        <Field v-slot="{ field, errorMessage }" name="price">
          <input
            v-bind="field"
            :placeholder="traducir('form.label.price')"
            class="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300"
            type="number"
          />
          <span v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</span>
        </Field>

        <Field v-slot="{ field, errorMessage }" name="stock">
          <input
            v-bind="field"
            :placeholder="traducir('form.label.stock')"
            class="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300"
            type="number"
          />
          <span v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</span>
        </Field>

        <Field v-slot="{ field, errorMessage }" name="category">
          <input
            v-bind="field"
            :placeholder="traducir('form.label.category')"
            class="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300"
            type="text"
          />
          <span v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</span>
        </Field>

        <button
          :disabled="isPending"
          class="mt-4 rounded-2xl bg-linear-to-br from-green-500 to-green-300 px-6 py-3 font-bold text-black shadow-lg disabled:opacity-50"
          type="submit"
        >
          {{ isPending ? '...' : traducir('action.submit') }}
        </button>
      </form>
    </div>
  </div>
</template>
