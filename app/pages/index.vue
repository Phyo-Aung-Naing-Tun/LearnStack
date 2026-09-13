<template>
  <div class="min-h-screen">

    <!-- ─── Hero ────────────────────────────────────────────────── -->
    <section class="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
      <!-- Subtle radial glow -->
      <div
        class="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-10"
        style="background: radial-gradient(circle, #0ea5e9 0%, transparent 70%);"
      />

      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <!-- Label pill -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 dark:bg-accent/20 text-accent text-xs font-semibold tracking-wider uppercase mb-5">
          <Sparkles class="w-3.5 h-3.5" />
          Learn by Building
        </div>

        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-[1.1] max-w-2xl">
          Everything you need to
          <span class="text-transparent bg-clip-text" style="background-image: linear-gradient(135deg, #0ea5e9, #38bdf8);">
            level up.
          </span>
        </h1>
        <p class="mt-5 text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
          Tutorials, book notes, and blog posts — built for developers who learn by doing.
        </p>

        <!-- Stat pills -->
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink
            to="/tutorials"
            class="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-md transition-all text-sm font-medium"
          >
            <GraduationCap class="w-4 h-4 text-sky-500" />
            <span class="text-slate-700 dark:text-slate-200">Tutorials</span>
            <span class="ml-1 px-1.5 py-0.5 text-[10px] rounded-md bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 font-bold">Series</span>
          </NuxtLink>
          <NuxtLink
            to="/books"
            class="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md transition-all text-sm font-medium"
          >
            <BookMarked class="w-4 h-4 text-amber-500" />
            <span class="text-slate-700 dark:text-slate-200">Books</span>
            <span class="ml-1 px-1.5 py-0.5 text-[10px] rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 font-bold">Notes</span>
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-md transition-all text-sm font-medium"
          >
            <FileText class="w-4 h-4 text-violet-500" />
            <span class="text-slate-700 dark:text-slate-200">Blog</span>
            <span class="ml-1 px-1.5 py-0.5 text-[10px] rounded-md bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 font-bold">Articles</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ─── Bento Grid ────────────────────────────────────────────── -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">

        <!-- ① Featured Tutorial — large card, spans 2 cols -->
        <NuxtLink
          to="/tutorials/learn-js-in-5-days"
          class="group relative lg:col-span-2 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 p-6 flex flex-col justify-between min-h-[200px]"
        >
          <!-- Accent strip -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-t-2xl" />

          <div>
            <div class="flex items-center gap-2 text-xs font-semibold text-sky-500 uppercase tracking-wider mb-3">
              <GraduationCap class="w-4 h-4" />
              Featured Tutorial
            </div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-500 transition-colors leading-snug">
              Learn JavaScript in 5 Days
            </h2>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
              A hands-on series to master JS fundamentals — from variables to async/await. 5 days, 5 lessons.
            </p>
          </div>

          <div class="flex items-center justify-between mt-5">
            <div class="flex gap-2">
              <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400">JavaScript</span>
              <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Beginner</span>
            </div>
            <div class="flex items-center gap-1 text-xs text-slate-400">
              <Clock class="w-3.5 h-3.5" />
              5 lessons
            </div>
          </div>
        </NuxtLink>

        <!-- ② Featured Book — tall card, spans 1 col + 2 rows -->
        <NuxtLink
          to="/books/clean-code"
          class="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 p-6 flex flex-col row-span-2"
        >
          <!-- Accent strip -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-t-2xl" />

          <div class="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-4">
            <BookMarked class="w-4 h-4" />
            Book Notes
          </div>

          <!-- Big emoji cover -->
          <div class="text-6xl text-center my-4 select-none">📖</div>

          <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors text-center leading-snug">
            Clean Code
          </h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 text-center mt-1">
            Robert C. Martin
          </p>

          <p class="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
            Timeless principles for writing code that is easy to read, understand, and maintain.
          </p>

          <div class="mt-4 flex flex-wrap gap-1.5 justify-center">
            <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">Best Practices</span>
            <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">5 Chapters</span>
          </div>

          <div class="mt-5">
            <div class="flex justify-between text-xs text-slate-400 mb-1">
              <span>Reading progress</span>
              <span>0%</span>
            </div>
            <div class="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div class="h-full bg-amber-400 rounded-full w-0" />
            </div>
          </div>
        </NuxtLink>

        <!-- ③ Recent Blog Posts — 3 small cards, each in 1 col -->
        <template v-if="recentPosts?.length">
          <NuxtLink
            v-for="(post, i) in recentPosts"
            :key="post.path"
            :to="post.path"
            class="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 p-5 flex flex-col"
          >
            <!-- Accent strip violet -->
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 to-purple-400 rounded-t-2xl" />

            <div class="flex items-center gap-2 text-xs font-semibold text-violet-500 uppercase tracking-wider mb-2">
              <FileText class="w-3.5 h-3.5" />
              Blog
            </div>

            <div class="flex flex-wrap gap-1.5 mb-2">
              <span
                v-for="tag in (post.tags || []).slice(0, 2)"
                :key="tag"
                class="px-2 py-0.5 text-[10px] font-medium rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
              >
                {{ tag }}
              </span>
            </div>

            <h3 class="font-bold text-slate-900 dark:text-slate-100 group-hover:text-violet-500 transition-colors leading-snug flex-1">
              {{ post.title }}
            </h3>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {{ post.description }}
            </p>

            <div v-if="(post as any).date" class="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar class="w-3 h-3" />
              {{ formatDate((post as any).date) }}
            </div>
          </NuxtLink>
        </template>

        <!-- Empty blog placeholder -->
        <div
          v-if="!recentPosts?.length"
          class="lg:col-span-2 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-500"
        >
          <FileText class="w-8 h-8 mb-2 opacity-50" />
          <p class="text-sm">No blog posts yet — check back soon!</p>
        </div>

      </div>

      <!-- View All row -->
      <div class="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 text-sm font-medium">
        <NuxtLink to="/tutorials" class="inline-flex items-center gap-1.5 text-sky-500 hover:text-sky-600 transition-colors">
          All Tutorials <ArrowRight class="w-4 h-4" />
        </NuxtLink>
        <NuxtLink to="/books" class="inline-flex items-center gap-1.5 text-amber-500 hover:text-amber-600 transition-colors">
          All Books <ArrowRight class="w-4 h-4" />
        </NuxtLink>
        <NuxtLink to="/blog" class="inline-flex items-center gap-1.5 text-violet-500 hover:text-violet-600 transition-colors">
          All Posts <ArrowRight class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { GraduationCap, BookMarked, FileText, Sparkles, Clock, Calendar, ArrowRight } from '@lucide/vue'

useHead({ title: 'LearnStack — Learn by Building' })
useSeoMeta({
  description: 'Tutorials, book notes, and blog posts for developers who learn by doing.',
  ogTitle: 'LearnStack — Learn by Building',
  ogDescription: 'Tutorials, book notes, and blog posts for developers who learn by doing.',
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

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
