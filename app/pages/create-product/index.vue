<script setup>
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

async function handleSubmit() {
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
    toast.success(t('createProduct.successToast'))
  } else {
    toast.error(t('createProduct.errorToast'))
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
        {{ t('createProduct.back') }}
      </button>

      <h1 class="mb-8 text-3xl font-bold text-white">{{ t('createProduct.title') }}</h1>

      <div class="flex flex-col gap-4 rounded-2xl bg-white p-8">
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-600">{{
            t('createProduct.name')
          }}</label>
          <input
            v-model="form.name"
            :placeholder="t('createProduct.namePlaceholder')"
            class="rounded-lg border px-4 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            type="text"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-600">{{
            t('createProduct.description')
          }}</label>
          <textarea
            v-model="form.description"
            :placeholder="t('createProduct.descriptionPlaceholder')"
            class="rounded-lg border px-4 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            rows="3"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-600">{{
            t('createProduct.price')
          }}</label>
          <input
            v-model="form.price"
            :placeholder="t('createProduct.pricePlaceholder')"
            class="rounded-lg border px-4 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            step="0.01"
            type="number"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-600">{{
            t('createProduct.stock')
          }}</label>
          <input
            v-model="form.stock"
            :placeholder="t('createProduct.stockPlaceholder')"
            class="rounded-lg border px-4 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            type="number"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-600">{{
            t('createProduct.category')
          }}</label>
          <input
            v-model="form.category"
            :placeholder="t('createProduct.categoryPlaceholder')"
            class="rounded-lg border px-4 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            type="text"
          />
        </div>

        <div v-if="error" class="text-sm text-red-500">{{ error }}</div>

        <button
          :disabled="loading"
          class="mt-2 rounded-xl bg-slate-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
          @click="handleSubmit"
        >
          {{ loading ? t('createProduct.submitting') : t('createProduct.submit') }}
        </button>
      </div>
    </div>
  </div>
</template>
