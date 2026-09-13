<template>
  <div>
    <!-- Chapter header -->
    <header class="mb-8">
      <NuxtLink
        :to="`/books/${book}`"
        class="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-light transition-colors mb-3"
      >
        <ArrowLeft class="w-4 h-4" />
        Back to {{ bookTitle }}
      </NuxtLink>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
        {{ page?.title || 'Loading...' }}
      </h1>
      <p v-if="page?.description" class="mt-2 text-lg text-slate-500 dark:text-slate-400">
        {{ page.description }}
      </p>
      <div class="flex items-center gap-3 mt-3 text-sm text-slate-500 dark:text-slate-400">
        <span>Chapter {{ chapter }}</span>
        <span>·</span>
        <span>{{ bookTitle }}</span>
      </div>
    </header>

    <!-- Markdown Content -->
    <article class="prose prose-slate dark:prose-invert max-w-none leading-relaxed">
      <ContentRenderer v-if="page" :value="page" />
      <div v-else class="animate-pulse space-y-4">
        <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
        <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
        <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
        <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
      </div>
    </article>

    <!-- Chapter Navigation -->
    <BookChapterNavigator
      :book="book"
      :prev-chapter="prevChapter"
      :next-chapter="nextChapter"
      :completed="chapterCompleted"
      @toggle-complete="toggleChapterComplete"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'book',
})

import { ArrowLeft } from '@lucide/vue'

const route = useRoute()
const { book, chapter: chapterParam } = route.params as { book: string; chapter: string }
const chapter = Number(chapterParam)

const bookPath = `/books/${book}`

// Fetch current chapter page
const { data: page } = await useAsyncData(
  `book-${book}-ch-${chapter}`,
  () => queryCollection('content').path(route.path).first()
)

// Fetch book index for title/author
const { data: bookData } = await useAsyncData(
  `book-index-${book}`,
  () => queryCollection('content').path(bookPath).first()
)

// Fetch all chapters in this book
const { data: allChapters } = await useAsyncData(
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

const bookTitle = computed(
  () => (bookData.value as any)?.bookTitle || (bookData.value as any)?.title || String(book).replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
)
const bookAuthor = computed(() => (bookData.value as any)?.author || '')

const chapterLinks = computed(() =>
  ((allChapters.value as any[]) || []).map((d: any) => ({
    chapter: d.chapter,
    title: d.title || `Chapter ${d.chapter}`,
  }))
)

// Prev / Next
const prevChapter = computed(() => {
  const idx = chapterLinks.value.findIndex((c) => c.chapter === chapter)
  return idx > 0 ? chapterLinks.value[idx - 1].chapter : null
})

const nextChapter = computed(() => {
  const idx = chapterLinks.value.findIndex((c) => c.chapter === chapter)
  return idx < chapterLinks.value.length - 1 ? chapterLinks.value[idx + 1].chapter : null
})

// Chapter completion tracking
const chapterCompleted = ref(false)

onMounted(() => {
  const stored = JSON.parse(localStorage.getItem('book-progress') || '{}')
  chapterCompleted.value = !!stored[`${book}-ch-${chapter}`]
})

function toggleChapterComplete() {
  chapterCompleted.value = !chapterCompleted.value
  if (import.meta.client) {
    const stored = JSON.parse(localStorage.getItem('book-progress') || '{}')
    if (chapterCompleted.value) {
      stored[`${book}-ch-${chapter}`] = true
    } else {
      delete stored[`${book}-ch-${chapter}`]
    }
    localStorage.setItem('book-progress', JSON.stringify(stored))
  }
}

// Progress percent
const totalChapters = computed(() => (allChapters.value as any[])?.length || 0)
const progressPercent = computed(() => {
  if (!totalChapters.value || !import.meta.client) return 0
  const stored = JSON.parse(localStorage.getItem('book-progress') || '{}')
  const done = chapterLinks.value.filter((c) => stored[`${book}-ch-${c.chapter}`]).length
  return Math.round((done / totalChapters.value) * 100)
})

// TOC extraction
const tocLinks = ref<{ id: string; text: string; depth: number }[]>([])

onMounted(() => {
  nextTick(() => {
    const article = document.querySelector('article')
    if (!article) return
    const headings = article.querySelectorAll('h2, h3')
    tocLinks.value = Array.from(headings).map((h) => ({
      id: h.id,
      text: h.textContent || '',
      depth: h.tagName === 'H3' ? 3 : 2,
    }))
  })
})

// Provide data to the book layout via shared composable
const bookState = useBookState()
bookState.tocLinks.value = tocLinks.value
bookState.bookSlug.value = book
bookState.bookTitle.value = bookTitle.value
bookState.bookAuthor.value = bookAuthor.value
bookState.chapterLinks.value = chapterLinks.value
bookState.currentChapter.value = chapter
bookState.progressPercent.value = progressPercent.value

// Keep in sync
watch(tocLinks, (val) => { bookState.tocLinks.value = val })
watch(bookTitle, (val) => { bookState.bookTitle.value = val })
watch(bookAuthor, (val) => { bookState.bookAuthor.value = val })
watch(chapterLinks, (val) => { bookState.chapterLinks.value = val })
watch(progressPercent, (val) => { bookState.progressPercent.value = val })

// SEO
const chapterTitle = computed(() => (page.value as any)?.title || `Chapter ${chapter}`)
const chapterDescription = computed(() => (page.value as any)?.description || `Chapter ${chapter} of ${bookTitle.value}`)

useHead({ title: chapterTitle })
useSeoMeta({
  description: chapterDescription,
  ogTitle: chapterTitle,
  ogDescription: chapterDescription,
})
</script>
