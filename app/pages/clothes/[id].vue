<script setup>
import { useQuery } from '@tanstack/vue-query'
import { Undo2 } from 'lucide-vue-next'

const route = useRoute()

const {
  data: producto,
  isPending,
  isError,
} = useQuery({
  queryKey: ['producto', route.params.id],
  queryFn: () =>
    fetch(`http://localhost:4000/products/${route.params.id}`).then((r) => r.json()),
})
</script>

<template>
  <div>
    <div v-if="isError" class="flex h-screen items-center justify-center text-2xl">
      Error al cargar el producto
    </div>
    <div v-else-if="isPending" class="flex h-screen items-center justify-center text-2xl">
      Cargando...
    </div>
    <div v-else-if="producto">
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
            {{ producto.category }}
          </div>
          <div class="text-2xl font-bold">{{ producto.name }}</div>
          <div class="mt-4 text-xl">{{ producto.description }}</div>
          <div class="mt-2 text-sm text-gray-500">
            Stock: {{ producto.stock }} unidades
          </div>
          <div class="mt-4 text-2xl font-bold">{{ producto.price }} €</div>
        </div>
      </div>
    </div>
  </div>
</template>
