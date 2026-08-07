<template>
  <div>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <!-- Breadcrumb -->
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-light transition-colors mb-6"
      >
        <ArrowLeft class="w-4 h-4" />
        All Posts
      </NuxtLink>

      <template v-if="post">
        <header class="mb-8">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
            {{ post.title }}
          </h1>
          <p v-if="post.description" class="mt-2 text-lg text-slate-500 dark:text-slate-400">
            {{ post.description }}
          </p>
          <div class="flex flex-wrap items-center gap-3 mt-3">
            <span v-if="post.date" class="text-sm text-slate-500 dark:text-slate-400">
              {{ formatDate(post.date) }}
            </span>
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/10 dark:bg-accent/20 text-accent"
            >
              {{ tag }}
            </span>
          </div>
        </header>

        <article class="prose prose-slate dark:prose-invert max-w-none leading-relaxed">
          <ContentRenderer :value="post" />
        </article>
      </template>

      <div v-else class="text-center py-12">
        <div class="animate-pulse space-y-4">
          <div class="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mx-auto" />
          <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
          <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
          <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@lucide/vue'

const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(
  `blog-${slug}`,
  () => queryCollection('content').path(`/blog/${slug}`).first()
)

const postTitle = computed(() => (post.value as any)?.title || 'Blog Post')
const postDescription = computed(() => (post.value as any)?.description || '')
const ogImage = computed(() => `/api/og-image?title=${encodeURIComponent(postTitle.value)}&description=${encodeURIComponent(postDescription.value)}`)

useHead({ title: postTitle })
useSeoMeta({
  description: postDescription,
  ogTitle: postTitle,
  ogDescription: postDescription,
  ogImage,
  twitterTitle: postTitle,
  twitterDescription: postDescription,
  twitterImage: ogImage,
})

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
