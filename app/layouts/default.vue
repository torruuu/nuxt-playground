<script setup lang="ts">
import { LangSwitch, ThemeSwitch } from '@/components/ui/switches'
</script>

<template>
  <div>
    <header class="flex items-center justify-end gap-2 p-4">
      <CreateBoton />
      <ThemeSwitch />
      <LangSwitch />
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>
