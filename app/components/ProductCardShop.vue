<script setup>
defineProps({
  id: Number,
  name: String,
  price: Number,
  description: String,
})
</script>

<template>
  <NuxtLink :to="`/product/${id}`">
    <div
      class="flex w-64 flex-col items-center rounded-xl bg-white p-6 text-center shadow-md"
    >
      <div class="mb-4 flex h-40 w-40 items-center justify-center overflow-hidden">
        <img
          :alt="`image ${name}`"
          class="max-h-full max-w-full object-contain"
          src="https://placehold.co/160x160?text=IMG disponible proximamente"
        />
      </div>
      <div class="text-md mb-2 font-semibold">{{ name }}</div>
      <div class="text-lg font-bold">{{ price }} €</div>
    </div>
  </NuxtLink>
</template>
