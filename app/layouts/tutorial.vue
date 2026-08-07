<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200 transition-colors duration-300">
    <AppHeader />

    <!-- Mobile: Toggle sidebar button -->
    <button
      class="lg:hidden fixed bottom-20 left-4 z-30 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700"
      aria-label="Open tutorial navigation"
      @click="mobileNavOpen = true"
    >
      <Menu class="w-5 h-5" />
    </button>

    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex gap-8 pt-6">
        <!-- Left: Series Navigation (Desktop) -->
        <TutorialSeriesNav
          v-model:mobile-open="mobileNavOpen"
          :series="seriesSlug"
          :series-title="seriesTitle"
          :series-description="seriesDescription"
          :days="dayLinks"
          :current-day="currentDay"
          :progress-percent="progressPercent"
          @close="mobileNavOpen = false"
        />

        <!-- Middle: Main Content -->
        <main class="flex-1 min-w-0 max-w-content mx-auto pb-24 lg:pb-8">
          <slot />
        </main>

        <!-- Right: Table of Contents (Desktop) -->
        <TutorialTocAside :toc-links="tocLinks" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Menu } from '@lucide/vue'

const {
  tocLinks,
  seriesSlug,
  seriesTitle,
  seriesDescription,
  dayLinks,
  currentDay,
  progressPercent,
} = useTutorialState()

const mobileNavOpen = ref(false)
</script>

<style scoped>
/* Ensure content area can scroll independently if needed */
main {
  min-height: calc(100vh - 120px);
}
</style>
