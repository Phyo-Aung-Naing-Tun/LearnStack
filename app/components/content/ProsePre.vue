<template>
  <div class="group relative my-6">
    <div class="flex items-center justify-between px-4 py-2 bg-slate-200/50 dark:bg-slate-700/50 rounded-t-lg border border-b-0 border-slate-300 dark:border-slate-600">
      <span class="text-xs font-mono text-slate-500 dark:text-slate-400">
        {{ language || 'text' }}
      </span>
      <button
        class="flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400"
        :class="{ 'text-emerald-600 dark:text-emerald-400': copied }"
        @click="copyCode"
      >
        <Check v-if="copied" class="w-3.5 h-3.5" />
        <Copy v-else class="w-3.5 h-3.5" />
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
    <pre
      class="!mt-0 !rounded-t-none border border-slate-300 dark:border-slate-600"
      :class="$attrs.class"
    ><slot /></pre>
  </div>
</template>

<script setup lang="ts">
import { Copy, Check } from '@lucide/vue'

const props = defineProps<{
  language?: string
  code?: string
}>()

const copied = ref(false)

function copyCode() {
  const code = props.code || ''
  navigator.clipboard.writeText(code).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}
</script>
