<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-100 hover:text-accent transition-colors">
        <BookOpen class="w-6 h-6 text-accent" stroke-width="2.5" />
        <span>LearnStack</span>
      </NuxtLink>

      <nav class="hidden sm:flex items-center gap-6 text-sm font-medium">
        <NuxtLink to="/" class="hover:text-accent transition-colors">Home</NuxtLink>
        <NuxtLink to="/blog" class="hover:text-accent transition-colors">Blog</NuxtLink>
        <NuxtLink to="/tutorials" class="hover:text-accent transition-colors">Tutorials</NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <ThemeSwitcher />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { BookOpen } from '@lucide/vue'
</script>
