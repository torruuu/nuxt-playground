<script setup lang="ts">
import { productSchema } from '@/lib/schemas/product.schema'
import { ArrowLeft } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const { t } = useI18n()
const router = useRouter()
const { fetchData, loading, error } = usefetchApi()

const form = ref({
  name: '',
  description: '',
  price: '',
  stock: '',
  category: '',
})

const formErrors = ref<Record<string, string>>({})

function validateForm() {
  const result = productSchema.safeParse({
    ...form.value,
    price: form.value.price,
    stock: form.value.stock,
  })

  if (!result.success) {
    formErrors.value = Object.fromEntries(
      result.error.issues.map((e) => [e.path[0], e.message]),
    )
    return false
  }

  formErrors.value = {}
  return true
}

async function handleSubmit() {
  if (!validateForm()) return

  await fetchData(
    '/products',
    {},
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form.value,
        price: parseFloat(form.value.price),
        stock: parseInt(form.value.stock),
      }),
    },
  )

  if (!error.value) {
    toast.success(t('api.success.product_created'))
  } else {
    toast.error(t('api.error.internal_server_error'))
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-800 p-8 pt-16">
    <div class="mx-auto max-w-xl">
      <button
        class="mb-8 flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
        @click="router.back()"
      >
        <ArrowLeft :size="16" />
        {{ t('action.back') }}
      </button>

      <h1 class="mb-8 text-3xl font-bold text-white">{{ t('product.create.title') }}</h1>

      <div class="flex flex-col gap-4 rounded-2xl bg-white p-8">
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-600">{{
            t('form.label.name')
          }}</label>
          <input
            v-model="form.name"
            :class="{ 'border-red-400': formErrors.name }"
            :placeholder="t('Nombre de producto')"
            class="rounded-lg border px-4 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            type="text"
          />
          <p v-if="formErrors.name" class="text-xs text-red-500">{{ formErrors.name }}</p>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-600">{{
            t('form.label.description')
          }}</label>
          <textarea
            v-model="form.description"
            :class="{ 'border-red-400': formErrors.description }"
            :placeholder="t('Descripción del producto')"
            class="rounded-lg border px-4 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            rows="3"
          />
          <p v-if="formErrors.description" class="text-xs text-red-500">
            {{ formErrors.description }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-600">{{
            t('form.label.price')
          }}</label>
          <input
            v-model="form.price"
            :class="{ 'border-red-400': formErrors.price }"
            :placeholder="t('Precio del producto')"
            class="rounded-lg border px-4 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            step="0.01"
            type="number"
          />
          <p v-if="formErrors.price" class="text-xs text-red-500">
            {{ formErrors.price }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-600">{{
            t('form.label.stock')
          }}</label>
          <input
            v-model="form.stock"
            :class="{ 'border-red-400': formErrors.stock }"
            :placeholder="t('Cantidad disponible de producto')"
            class="rounded-lg border px-4 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            type="number"
          />
          <p v-if="formErrors.stock" class="text-xs text-red-500">
            {{ formErrors.stock }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-600">{{
            t('form.label.category')
          }}</label>
          <input
            v-model="form.category"
            :class="{ 'border-red-400': formErrors.category }"
            :placeholder="t('Categoria de producto')"
            class="rounded-lg border px-4 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            type="text"
          />
          <p v-if="formErrors.category" class="text-xs text-red-500">
            {{ formErrors.category }}
          </p>
        </div>

        <div v-if="error" class="text-sm text-red-500">{{ error }}</div>

        <button
          :disabled="loading"
          class="mt-2 rounded-xl bg-slate-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
          @click="handleSubmit"
        >
          {{ loading ? t('action.submitting') : t('action.submit') }}
        </button>
      </div>
    </div>
  </div>
</template>
