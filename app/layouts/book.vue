<template>
  <div
    class="flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200 transition-colors duration-300"
    style="height: 100dvh; overflow: hidden;"
  >
    <AppHeader />

    <!-- Mobile: Toggle sidebar button -->
    <button
      class="lg:hidden fixed bottom-20 left-4 z-30 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700"
      aria-label="Open chapter navigation"
      @click="mobileNavOpen = true"
    >
      <Menu class="w-5 h-5" />
    </button>

    <!-- Three-column layout — each column scrolls independently -->
    <div class="flex-1 overflow-hidden max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex gap-8 h-full">

        <!-- Left: Chapter Navigation -->
        <BookChapterNav
          v-model:mobile-open="mobileNavOpen"
          :book="bookSlug"
          :book-title="bookTitle"
          :book-author="bookAuthor"
          :chapters="chapterLinks"
          :current-chapter="currentChapter"
          :progress-percent="progressPercent"
          @close="mobileNavOpen = false"
        />

        <!-- Middle: Main Content — scrollable column -->
        <main class="flex-1 min-w-0 overflow-y-auto py-6 pb-24 lg:pb-8">
          <div class="max-w-content mx-auto">
            <slot />
          </div>
        </main>

        <!-- Right: Table of Contents -->
        <BookTocAside :toc-links="tocLinks" />

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Menu } from '@lucide/vue'

const {
  tocLinks,
  bookSlug,
  bookTitle,
  bookAuthor,
  chapterLinks,
  currentChapter,
  progressPercent,
} = useBookState()

const mobileNavOpen = ref(false)
</script>
