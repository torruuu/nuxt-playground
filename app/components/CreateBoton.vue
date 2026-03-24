<script setup>
import { Plus } from 'lucide-vue-next'

const router = useRouter()
</script>

<template>
  <div class="fixed top-4 right-36 z-50">
    <button
      class="relative rounded-full bg-white p-3 shadow-lg"
      @click="router.push('/create-product')"
    >
      <Plus :size="22" />
    </button>
  </div>
</template>
