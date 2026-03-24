<script setup>
import { useProductos } from '@/composables/useProducts'
import { Undo2 } from 'lucide-vue-next'

const route = useRoute()
const { productos, loading, error, fetchData } = useProductos()

fetchData('/products/' + route.params.id)
</script>

<template>
  <div>
    <div v-if="error" class="flex h-screen items-center justify-center text-2xl">
      {{ error }}
    </div>
    <div v-else-if="loading" class="flex h-screen items-center justify-center text-2xl">
      Cargando...
    </div>
    <div v-else-if="productos">
      <div class="mb-10 ml-12">
        <NuxtLink class="inline-block" to="/clothes">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-white/30 shadow-lg backdrop-blur-md transition hover:bg-white/40"
          >
            <Undo2 class="text-black" size="28" />
          </div>
        </NuxtLink>
      </div>
      <div class="mx-auto grid max-w-3xl grid-cols-2 gap-4">
        <div
          class="mr-4 flex items-center justify-center rounded-xl border bg-gray-100 p-8"
        >
          <span class="text-6xl">🛍️</span>
        </div>
        <div class="flex flex-col">
          <div class="mb-2 text-sm tracking-widest text-gray-400 uppercase">
            {{ productos.category }}
          </div>
          <div class="text-2xl font-bold">{{ productos.name }}</div>
          <div class="mt-4 text-xl">{{ productos.description }}</div>
          <div class="mt-2 text-sm text-gray-500">
            Stock: {{ productos.stock }} unidades
          </div>
          <div class="mt-4 text-2xl font-bold">{{ productos.price }} €</div>
        </div>
      </div>
    </div>
  </div>
</template>
