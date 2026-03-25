<script setup>
import { useInfiniteQuery } from '@tanstack/vue-query'
import { Heart } from 'lucide-vue-next'
import { computed } from 'vue'

const favorites = useFavoritesStore()

const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
  useInfiniteQuery({
    queryKey: ['products'],
    queryFn: async ({ pageParam = 1 }) => {
      const limit = 6
      const res = await fetch(`/api/products?limit=${pageParam * limit}`)

      if (!res.ok) throw new Error(`Error ${res.status}`)
      return res.json()
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < 6 ? allPages.length + 1 : undefined
    },
  })

const productos = computed(() => data.value?.pages.flat() ?? [])
</script>

<template>
  <div class="min-h-screen bg-slate-800 p-8">
    <div class="mx-auto max-w-6xl">
      <h1 class="mb-2 text-3xl font-bold text-white">Tienda</h1>
      <p class="mb-8 text-sm text-slate-400">
        {{ productos.length }} productos disponibles
      </p>

      <div v-if="isPending" class="mt-20 text-center text-slate-400">
        Cargando productos...
      </div>
      <div v-else-if="isError" class="mt-20 text-center text-red-400">
        Error al cargar los productos...
      </div>

      <div v-else class="flex flex-col items-center">
        <div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        <button
          v-if="hasNextPage"
          :disabled="isFetchingNextPage"
          class="mt-10 rounded-lg bg-white px-8 py-2.5 font-semibold text-slate-800 transition-colors hover:bg-slate-100 disabled:opacity-50"
          @click="fetchNextPage()"
        >
          {{ isFetchingNextPage ? 'Cargando...' : 'Cargar más' }}
        </button>
      </div>
    </div>
  </div>
</template>
