<template>
  <div>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <!-- Breadcrumb -->
      <NuxtLink
        to="/books"
        class="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-light transition-colors mb-6"
      >
        <ArrowLeft class="w-4 h-4" />
        All Books
      </NuxtLink>

      <!-- Book hero -->
      <div class="flex items-start gap-5 mb-8">
        <div class="text-6xl leading-none flex-shrink-0">
          {{ (bookIndex as any)?.coverEmoji || '📖' }}
        </div>
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
            {{ bookIndex?.title }}
          </h1>
          <p v-if="(bookIndex as any)?.author" class="mt-1 text-slate-500 dark:text-slate-400">
            by {{ (bookIndex as any).author }}
          </p>
          <div class="flex flex-wrap gap-2 mt-3">
            <span
              v-for="tag in ((bookIndex as any)?.tags || [])"
              :key="tag"
              class="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/10 dark:bg-accent/20 text-accent"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Book description prose -->
      <article class="prose prose-slate dark:prose-invert max-w-none mb-10 leading-relaxed">
        <ContentRenderer v-if="bookIndex" :value="bookIndex" />
      </article>

      <!-- Chapter list -->
      <section>
        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Chapters</h2>
        <div class="grid gap-3">
          <NuxtLink
            v-for="ch in chapters"
            :key="ch.chapter"
            :to="`/books/${book}/${ch.chapter}`"
            class="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-accent/50 dark:hover:border-accent/50 transition-all"
          >
            <span
              class="flex-shrink-0 w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
            >
              {{ ch.chapter }}
            </span>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-slate-800 dark:text-slate-200">{{ ch.title }}</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{{ ch.description }}</p>
            </div>
            <ChevronRight class="w-5 h-5 ml-auto text-slate-400 flex-shrink-0" />
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ChevronRight } from '@lucide/vue'

const route = useRoute()
const { book } = route.params as { book: string }

const bookPath = `/books/${book}`

// Fetch book index
const { data: bookIndex } = await useAsyncData(
  `book-index-${book}`,
  () => queryCollection('content').path(bookPath).first()
)

// Fetch all chapters
const { data: chapters } = await useAsyncData(
  `book-chapters-${book}`,
  async () => {
    try {
      const items = await queryCollection('content').all()
      return (items || [])
        .filter((d: any) => d.path?.startsWith(`${bookPath}/`) && d.chapter)
        .sort((a: any, b: any) => (a.chapter || 0) - (b.chapter || 0))
    } catch {
      return []
    }
  }
)

const title = computed(() => (bookIndex.value as any)?.title || book)

useHead({ title })
useSeoMeta({
  description: computed(() => (bookIndex.value as any)?.description || ''),
  ogTitle: computed(() => `${title.value} — LearnStack`),
  ogDescription: computed(() => (bookIndex.value as any)?.description || ''),
})
</script>
