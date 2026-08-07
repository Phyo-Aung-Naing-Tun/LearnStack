<template>
  <div>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
        Blog
      </h1>
      <p class="text-slate-500 dark:text-slate-400 mb-8">
        Articles, tutorials, and deep dives on web development.
      </p>

      <div class="grid gap-4">
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="post.path"
          class="block p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-accent/50 dark:hover:border-accent/50 transition-all shadow-sm hover:shadow-md"
        >
          <div class="flex flex-wrap items-center gap-2 text-xs font-medium text-accent mb-2">
            <span v-for="tag in post.tags" :key="tag" class="px-2 py-0.5 rounded-full bg-accent/10 dark:bg-accent/20">
              {{ tag }}
            </span>
          </div>
          <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100">
            {{ post.title }}
          </h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {{ post.description }}
          </p>
          <div class="flex items-center gap-3 mt-3 text-xs text-slate-400 dark:text-slate-500">
            <span>{{ formatDate(post.date) }}</span>
          </div>
        </NuxtLink>
      </div>

      <div v-if="!posts?.length" class="text-center py-12 text-slate-500 dark:text-slate-400">
        <FileText class="w-10 h-10 mx-auto mb-3 opacity-50" />
        <p>No blog posts yet. Check back soon!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FileText } from '@lucide/vue'

useHead({ title: 'Blog' })
useSeoMeta({
  description: 'Articles, tutorials, and deep dives on web development.',
  ogTitle: 'Blog — LearnStack',
  ogDescription: 'Articles, tutorials, and deep dives on web development.',
})

const { data: posts } = await useAsyncData(
  'blog-list',
  async () => {
    const items = await queryCollection('content')
      .where('path', 'LIKE', '/blog/%')
      .all()
    return (items || [])
      .filter((d: any) => d.path !== '/blog')
      .sort((a: any, b: any) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
  }
)

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
