<script setup>
import { useProductos } from '@/composables/useProducts'
import { toast } from 'vue-sonner'

const { t: traducir } = useI18n()
const { postData, loading, error } = useProductos()

const form = ref({
  name: '',
  description: '',
  price: '',
  stock: '',
  category: '',
})

async function handleSubmit() {
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
  const data = await postData('/products', form.value)
  if (data) {
    toast.success(traducir('api.success.product_created'))
    navigateTo('/clothes')
  } else {
    toast.error(traducir('api.error.internal_server_error'))
  }
}
</script>

<template>
  <div class="mx-auto max-w-xl px-6 py-20">
    <h1 class="mb-8 text-2xl font-bold">{{ traducir('product.create.title') }}</h1>

    <div v-if="error" class="mb-4 text-red-500">{{ error }}</div>

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
        :disabled="loading"
        class="mt-4 rounded-2xl bg-linear-to-br from-green-500 to-green-300 px-6 py-3 font-bold text-black shadow-lg disabled:opacity-50"
        @click="handleSubmit"
      >
        {{ loading ? '...' : traducir('action.submit') }}
      </button>
    </div>
  </div>
</template>
