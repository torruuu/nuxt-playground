<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { LangSwitch, ThemeSwitch } from '@/components/ui/switches'
import { Plus } from 'lucide-vue-next'

const route = useRoute()
</script>

<template>
  <div>
    <header class="flex items-center justify-end gap-2 p-4">
      <NuxtLink v-if="route.path !== '/create'" to="/create">
        <Button variant="outline">
          <Plus class="h-[1.2rem] w-[1.2rem] transition-all" />
          <span class="sr-only">Create product</span>
        </Button>
      </NuxtLink>
      <ThemeSwitch />
      <LangSwitch />
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
