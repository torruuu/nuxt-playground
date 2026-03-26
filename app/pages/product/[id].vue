<script setup>
import { useQuery } from '@tanstack/vue-query'
import { ArrowLeft, Heart } from 'lucide-vue-next'
import { computed } from 'vue'
import { fetchApi } from '~/lib/shadcn/api'

const route = useRoute()
const router = useRouter()
const carro = useCarroStore()
const favorites = useFavoritesStore()

const id = computed(() => route.params.id)

const { data, isPending, error } = useQuery({
  queryKey: ['product', id],
  queryFn: async () => {
    const { data, error } = await fetchApi(`/api/products/${id.value}`)
    if (error) throw new Error(error)
    return data
  },
  enabled: computed(() => !!id.value),
})

function addItem(product) {
  carro.addItem(product)
}
function removeFavorite(product) {
  favorites.toggleFavorito(product)
}
</script>

<template>
  <div class="min-h-screen bg-slate-800 p-8 pt-16">
    <div class="mx-auto max-w-4xl">
      <button
        class="mb-8 flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
        @click="router.back()"
      >
        <ArrowLeft :size="16" />
        Volver a la tienda
      </button>

      <div v-if="isPending" class="mt-20 flex justify-center text-lg text-slate-400">
        Cargando producto...
      </div>

      <div v-else>
        <div v-if="data" class="flex w-full gap-10 rounded-2xl bg-white p-10">
          <div
            class="flex h-72 w-72 min-w-72 items-center justify-center overflow-hidden rounded-xl bg-slate-100"
          >
            <img
              :alt="data.title"
              :src="data.image"
              class="max-h-full max-w-full object-contain"
            />
          </div>

          <div class="flex flex-1 flex-col justify-center gap-4">
            <p class="text-xs tracking-widest text-slate-400 uppercase">
              {{ data.category }}
            </p>
            <h1 class="text-2xl font-bold text-slate-800">{{ data.name }}</h1>
            <p class="text-sm leading-relaxed text-gray-500">{{ data.description }}</p>
            <div class="text-3xl font-bold text-slate-800">{{ data.price }} €</div>

            <div class="mt-4 flex gap-4">
              <button
                class="flex items-center gap-2 rounded-xl bg-slate-800 px-6 py-3 text-white transition-colors hover:bg-slate-700"
                @click="addItem(data)"
              >
                Añadir al carrito
              </button>
              <button
                class="rounded-xl border border-slate-200 p-3 transition-colors hover:border-red-300"
                @click="removeFavorite(data)"
              >
                <Heart
                  :fill="favorites.esFavorito(data.id) ? '#ef4444' : 'none'"
                  :size="20"
                  :stroke="favorites.esFavorito(data.id) ? '#ef4444' : '#94a3b8'"
                  class="transition-colors"
                />
              </button>
            </div>
          </div>
        </div>

        <div v-else class="mt-20 text-center">
          <p class="text-2xl font-bold text-red-400">
            {{ error?.message ?? 'ID de producto no encontrado.' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
