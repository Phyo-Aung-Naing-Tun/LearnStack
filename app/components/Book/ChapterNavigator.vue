<template>
  <!-- Desktop only: inline prev/next + mark complete -->
  <nav
    class="hidden lg:flex items-center justify-between gap-4 py-6 border-t border-slate-200 dark:border-slate-700 mt-8"
    aria-label="Chapter navigation"
  >
    <NuxtLink
      v-if="prevChapter"
      :to="`/books/${book}/${prevChapter}`"
      class="group flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-accent transition-colors"
    >
      <ArrowLeft class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
      <span class="hidden sm:inline">Previous Chapter</span>
      <span class="sm:hidden">Prev</span>
    </NuxtLink>
    <div v-else class="flex-1" />

    <!-- Mark complete button -->
    <button
      class="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
      :class="completed
        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
        : 'bg-slate-100 text-slate-600 hover:bg-accent/10 hover:text-accent dark:bg-slate-800 dark:text-slate-400'"
      @click="$emit('toggleComplete')"
    >
      <CheckCircle class="w-4 h-4" />
      {{ completed ? 'Completed!' : 'Mark Complete' }}
    </button>

    <NuxtLink
      v-if="nextChapter"
      :to="`/books/${book}/${nextChapter}`"
      class="group flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-accent transition-colors"
    >
      <span class="hidden sm:inline">Next Chapter</span>
      <span class="sm:hidden">Next</span>
      <ArrowRight class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
    </NuxtLink>
    <div v-else class="flex-1" />
  </nav>

  <!-- Mobile sticky bottom bar -->
  <div
    class="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 px-4 py-3 z-40"
  >
    <div class="flex items-center justify-between max-w-content mx-auto">
      <NuxtLink
        v-if="prevChapter"
        :to="`/books/${book}/${prevChapter}`"
        class="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 active:text-accent"
      >
        <ArrowLeft class="w-4 h-4" />
        Prev
      </NuxtLink>
      <div v-else />

      <button
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all active:scale-95"
        :class="completed
          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
          : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'"
        @click="$emit('toggleComplete')"
      >
        <CheckCircle class="w-4 h-4" />
        {{ completed ? 'Done' : 'Complete' }}
      </button>

      <NuxtLink
        v-if="nextChapter"
        :to="`/books/${book}/${nextChapter}`"
        class="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 active:text-accent"
      >
        Next
        <ArrowRight class="w-4 h-4" />
      </NuxtLink>
      <div v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight, CheckCircle } from '@lucide/vue'

defineProps<{
  book: string
  prevChapter: number | null
  nextChapter: number | null
  completed: boolean
}>()

defineEmits<{
  toggleComplete: []
}>()
</script>
