<script setup lang="ts">
import { productSchema } from '@/lib/schemas/product.schema'
import { ArrowLeft } from 'lucide-vue-next'
import { useField, useForm } from 'vee-validate'
import { toast } from 'vue-sonner'

const { t } = useI18n()
const router = useRouter()
const { fetchData, loading, error } = usefetchApi()

const { handleSubmit } = useForm({
  validationSchema: productSchema,
})
//tipamos para evitar error en consola.
const { value: name, errorMessage: nameError } = useField<string>('name')
const { value: description, errorMessage: descriptionError } =
  useField<string>('description')
const { value: price, errorMessage: priceError } = useField<number>('price')
const { value: stock, errorMessage: stockError } = useField<number>('stock')
const { value: category, errorMessage: categoryError } = useField<string>('category')

const onSubmit = handleSubmit(async (values) => {
  await fetchData(
    '/products',
    {},
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    },
  )

  if (!error.value) {
    toast.success(t('api.success.product_created'))
  } else {
    toast.error(t('api.error.internal_server_error'))
  }
})
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
            v-model="name"
            :class="{ 'border-red-400': nameError }"
            :placeholder="t('Nombre de producto')"
            class="rounded-lg border px-4 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            type="text"
          />
          <p v-if="nameError" class="text-xs text-red-500">{{ nameError }}</p>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-600">{{
            t('form.label.description')
          }}</label>
          <textarea
            v-model="description"
            :class="{ 'border-red-400': descriptionError }"
            :placeholder="t('Descripción del producto')"
            class="rounded-lg border px-4 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            rows="3"
          />
          <p v-if="descriptionError" class="text-xs text-red-500">
            {{ descriptionError }}
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-600">{{
            t('form.label.price')
          }}</label>
          <input
            v-model="price"
            :class="{ 'border-red-400': priceError }"
            :placeholder="t('Precio del producto')"
            class="rounded-lg border px-4 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            step="0.01"
            type="number"
          />
          <p v-if="priceError" class="text-xs text-red-500">{{ priceError }}</p>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-600">{{
            t('form.label.stock')
          }}</label>
          <input
            v-model="stock"
            :class="{ 'border-red-400': stockError }"
            :placeholder="t('Cantidad disponible de producto')"
            class="rounded-lg border px-4 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            type="number"
          />
          <p v-if="stockError" class="text-xs text-red-500">{{ stockError }}</p>
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-slate-600">{{
            t('form.label.category')
          }}</label>
          <input
            v-model="category"
            :class="{ 'border-red-400': categoryError }"
            :placeholder="t('Categoria de producto')"
            class="rounded-lg border px-4 py-2 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            type="text"
          />
          <p v-if="categoryError" class="text-xs text-red-500">{{ categoryError }}</p>
        </div>

        <div v-if="error" class="text-sm text-red-500">{{ error }}</div>

        <button
          :disabled="loading"
          class="mt-2 rounded-xl bg-slate-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
          @click="onSubmit"
        >
          {{ loading ? t('action.submitting') : t('action.submit') }}
        </button>
      </div>
    </div>
  </div>
</template>
