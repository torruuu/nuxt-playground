<script setup>
import { useQuery } from '@tanstack/vue-query'

const {
  data: productos,
  isPending,
  isError,
} = useQuery({
  queryKey: ['productos'],
  queryFn: () => fetch('http://localhost:4000/products').then((r) => r.json()),
})
</script>

<template>
  <div class="px-32 py-32">
    <div class="flex flex-col items-center">
      <div v-if="isPending" class="text-2xl">Cargando...</div>
      <div v-else-if="isError" class="text-2xl">Error al cargar productos</div>
      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="producto in productos"
          :key="producto.id"
          :to="`/clothes/${producto.id}`"
        >
          <div class="flex h-full flex-col rounded-3xl bg-white p-4 shadow-md">
            <div
              class="flex h-64 w-full items-center justify-center rounded-2xl bg-gray-100"
            >
              <span class="text-xl">Imagen no disponible</span>
            </div>
            <div class="mt-3 text-xs tracking-widest text-gray-400 uppercase">
              {{ producto.category }}
            </div>
            <div class="mt-1 line-clamp-2 font-bold">{{ producto.name }}</div>
            <div class="mt-1">{{ producto.price }} €</div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
