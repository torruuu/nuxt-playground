<script setup>
import { useProductos } from '@/composables/useProducts'

const { productos, loading, error, fetchData, cargarMas } = useProductos()

const limit = ref(6)
fetchData('/products')

const finalPagina = ref(null)
let chivato = null

onMounted(() => {
  chivato = new IntersectionObserver((elementos) => {
    if (elementos[0].isIntersecting && !loading.value) {
      limit.value += 3
      cargarMas(limit.value)
    }
  })

  watch(finalPagina, (ultimaFila) => {
    if (ultimaFila) chivato.observe(ultimaFila)
  })
})
</script>

<template>
  <div class="px-32 py-32">
    <div class="flex flex-col items-center">
      <div v-if="loading && !productos" class="text-2xl">Cargando...</div>
      <div v-else-if="error" class="text-2xl">{{ error }}</div>
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
      <div v-if="loading && productos" class="mt-6 text-gray-400">Cargando más...</div>
      <div ref="finalPagina" class="mt-10 h-1 w-full"></div>
    </div>
  </div>
</template>
