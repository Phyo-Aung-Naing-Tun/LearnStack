<template>
  <div>
    <!-- Hero -->
    <section class="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h1 class="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Learn by Building
        </h1>
        <p class="mt-4 text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Step-by-step tutorials and in-depth blog posts to level up your development skills.
        </p>
        <div class="mt-8 flex items-center justify-center gap-4">
          <NuxtLink
            to="/tutorials"
            class="px-6 py-2.5 rounded-lg bg-accent text-white font-medium text-sm hover:bg-sky-700 transition-colors shadow-sm"
          >
            Browse Tutorials
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Read Blog
          </NuxtLink>
        </div>
      </div>
    </section>

    <div class="max-w-3xl mx-auto px-4 sm:px-6">
      <!-- Featured Tutorial -->
      <section class="py-12">
        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          Featured Tutorial
        </h2>
        <NuxtLink
          to="/tutorials/learn-js-in-5-days"
          class="block p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-accent/50 dark:hover:border-accent/50 transition-all shadow-sm hover:shadow-md"
        >
          <div class="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider mb-2">
            <GraduationCap class="w-4 h-4" />
            Tutorial Series
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">
            Learn JavaScript in 5 Days
          </h3>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
            A hands-on, step-by-step series to master JavaScript fundamentals — from variables to async programming. 5 days, 5 lessons.
          </p>
        </NuxtLink>
      </section>

      <!-- Recent Blog Posts -->
      <section class="py-12 border-t border-slate-200 dark:border-slate-800">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">
            Recent Posts
          </h2>
          <NuxtLink
            to="/blog"
            class="text-sm font-medium text-accent hover:text-accent-light transition-colors"
          >
            View all →
          </NuxtLink>
        </div>
        <div class="grid gap-4">
          <NuxtLink
            v-for="post in recentPosts"
            :key="post.path"
            :to="post.path"
            class="block p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-accent/50 dark:hover:border-accent/50 transition-all shadow-sm hover:shadow-md"
          >
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span
                v-for="tag in (post.tags || []).slice(0, 2)"
                :key="tag"
                class="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/10 dark:bg-accent/20 text-accent"
              >
                {{ tag }}
              </span>
            </div>
            <h3 class="font-bold text-slate-900 dark:text-slate-100">
              {{ post.title }}
            </h3>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
              {{ post.description }}
            </p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GraduationCap } from '@lucide/vue'

useHead({ title: 'LearnStack — Learn by Building' })
useSeoMeta({
  description: 'Step-by-step tutorials and in-depth blog posts to level up your development skills.',
  ogTitle: 'LearnStack — Learn by Building',
  ogDescription: 'Step-by-step tutorials and in-depth blog posts to level up your development skills.',
  ogImage: '/api/og-image',
})

const { data: recentPosts } = await useAsyncData(
  'home-recent-posts',
  async () => {
    try {
      const items = await queryCollection('content').all()
      return (items || [])
        .filter((d: any) => d.path?.startsWith('/blog/'))
        .sort((a: any, b: any) => {
          const da = a.date ? new Date(a.date).getTime() : 0
          const db = b.date ? new Date(b.date).getTime() : 0
          return db - da
        })
        .slice(0, 3)
    } catch {
      return []
    }
  }
)
</script>
