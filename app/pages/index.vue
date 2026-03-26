<script setup>
import { useQuery } from '@tanstack/vue-query'
import { Heart } from 'lucide-vue-next'
import { fetchApi } from '~/lib/shadcn/api'

const favorites = useFavoritesStore()

const {
  data: productos,
  isPending,
  isError,
} = useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    const { data, error } = await fetchApi('/api/products')
    if (error) throw new Error(error)
    return data
  },
})
</script>

<template>
  <div class="min-h-screen bg-slate-800 p-8">
    <div class="mx-auto max-w-6xl">
      <h1 class="mb-2 text-3xl font-bold text-white">Tienda</h1>
      <p class="mb-8 text-sm text-slate-400">
        {{ productos?.length }} productos disponibles
      </p>

      <div v-if="isPending" class="mt-20 text-center text-slate-400">
        Cargando productos...
      </div>
      <div v-else-if="isError" class="mt-20 text-center text-red-400">
        Error al cargar los productos...
      </div>

      <div v-else class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCardShop
          v-for="product in productos"
          :id="product.id"
          :key="product.id"
          :description="product.description"
          :name="product.name"
          :price="parseFloat(product.price)"
        >
          <template #acciones>
            <button
              class="transition-colors hover:text-red-400"
              @click="favorites.toggleFavorito(product)"
            >
              <Heart :size="20" />
            </button>
          </template>
        </ProductCardShop>
      </div>
    </div>
  </div>
</template>
