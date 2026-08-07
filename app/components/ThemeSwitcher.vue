<template>
  <ClientOnly>
    <button
      class="p-2 rounded-lg transition-colors hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-accent"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="toggleTheme"
    >
      <Sun v-if="isDark" class="w-5 h-5 text-yellow-400" />
      <Moon v-else class="w-5 h-5 text-slate-600" />
    </button>
    <template #fallback>
      <div class="w-9 h-9" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Sun, Moon } from '@lucide/vue'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>
