<script setup>
import { useMutation } from '@tanstack/vue-query'
import { Undo2 } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const { t: traducir } = useI18n()

const form = ref({
  name: '',
  description: '',
  price: '',
  stock: '',
  category: '',
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

function handleSubmit() {
  if (
    !form.value.name ||
    !form.value.description ||
    !form.value.price ||
    !form.value.stock ||
    !form.value.category
  ) {
    toast.error(traducir('form.error.required'))
    return
  }
  crearProducto(form.value)
}
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

      <div class="flex flex-col gap-4">
        <input
          v-model="form.name"
          :placeholder="traducir('form.label.name')"
          class="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300"
          type="text"
        />
        <textarea
          v-model="form.description"
          :placeholder="traducir('form.label.description')"
          class="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300"
          rows="3"
        />
        <input
          v-model="form.price"
          :placeholder="traducir('form.label.price')"
          class="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300"
          type="number"
        />
        <input
          v-model="form.stock"
          :placeholder="traducir('form.label.stock')"
          class="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300"
          type="number"
        />
        <input
          v-model="form.category"
          :placeholder="traducir('form.label.category')"
          class="rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-gray-300"
          type="text"
        />

        <button
          :disabled="isPending"
          class="mt-4 rounded-2xl bg-linear-to-br from-green-500 to-green-300 px-6 py-3 font-bold text-black shadow-lg disabled:opacity-50"
          @click="handleSubmit"
        >
          {{ isPending ? '...' : traducir('action.submit') }}
        </button>
      </div>
    </div>
  </div>
</template>
