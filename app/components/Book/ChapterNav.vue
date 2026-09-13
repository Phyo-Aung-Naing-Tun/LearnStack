<template>
  <!-- Desktop: left sidebar — hidden on mobile, scrollable on desktop -->
  <aside class="chapter-nav-desktop hidden lg:flex lg:flex-col w-[250px] shrink-0 overflow-y-auto py-6">
    <nav>
      <!-- Book Title -->
      <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">
        {{ bookTitle }}
      </h3>
      <p class="text-xs text-slate-500 dark:text-slate-400 mb-4">
        {{ bookAuthor }}
      </p>

      <!-- Progress bar -->
      <div class="mb-4">
        <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>Progress</span>
          <span>{{ progressPercent }}%</span>
        </div>
        <div class="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-accent rounded-full transition-all duration-500"
            :style="{ width: progressPercent + '%' }"
          />
        </div>
      </div>

      <!-- Chapter links -->
      <ul class="space-y-1">
        <li v-for="ch in chapters" :key="ch.chapter">
          <NuxtLink
            :to="`/books/${book}/${ch.chapter}`"
            class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors"
            :class="ch.chapter === currentChapter
              ? 'bg-accent/10 text-accent font-semibold dark:bg-accent/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            <span
              class="flex-shrink-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
              :class="isChapterCompleted(ch.chapter)
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'"
            >
              <Check v-if="isChapterCompleted(ch.chapter)" class="w-3 h-3" />
              <span v-else>{{ ch.chapter }}</span>
            </span>
            <span class="truncate">{{ ch.title }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>

  <!-- Mobile: Slide-over drawer -->
  <Transition name="slide">
    <div
      v-if="mobileOpen"
      class="fixed inset-0 z-50 lg:hidden"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50"
        @click="$emit('close')"
      />
      <!-- Drawer -->
      <aside class="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 shadow-xl p-5 overflow-y-auto">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100">{{ bookTitle }}</h3>
          <button
            class="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
            @click="$emit('close')"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Progress bar -->
        <div class="mb-4">
          <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Progress</span>
            <span>{{ progressPercent }}%</span>
          </div>
          <div class="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              class="h-full bg-accent rounded-full transition-all duration-500"
              :style="{ width: progressPercent + '%' }"
            />
          </div>
        </div>

        <ul class="space-y-1">
          <li v-for="ch in chapters" :key="ch.chapter">
            <NuxtLink
              :to="`/books/${book}/${ch.chapter}`"
              class="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors"
              :class="ch.chapter === currentChapter
                ? 'bg-accent/10 text-accent font-semibold dark:bg-accent/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
              @click="$emit('close')"
            >
              <span
                class="flex-shrink-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                :class="isChapterCompleted(ch.chapter)
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'"
              >
                <Check v-if="isChapterCompleted(ch.chapter)" class="w-3 h-3" />
                <span v-else>{{ ch.chapter }}</span>
              </span>
              <span class="truncate">{{ ch.title }}</span>
            </NuxtLink>
          </li>
        </ul>
      </aside>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Check, X } from '@lucide/vue'

interface ChapterInfo {
  chapter: number
  title: string
}

const props = defineProps<{
  book: string
  bookTitle: string
  bookAuthor: string
  chapters: ChapterInfo[]
  currentChapter: number
  progressPercent: number
}>()

defineEmits<{
  close: []
}>()

const mobileOpen = defineModel<boolean>('mobileOpen', { default: false })

function isChapterCompleted(chapter: number): boolean {
  if (!import.meta.client) return false
  const stored = JSON.parse(localStorage.getItem('book-progress') || '{}')
  return !!stored[`${props.book}-ch-${chapter}`]
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
.slide-enter-from aside,
.slide-leave-to aside {
  transform: translateX(-100%);
}
.slide-enter-active aside,
.slide-leave-active aside {
  transition: transform 0.25s ease;
}
</style>
