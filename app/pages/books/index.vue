<template>
  <div>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
        Books
      </h1>
      <p class="text-slate-500 dark:text-slate-400 mb-8">
        Summaries, notes, and chapter-by-chapter breakdowns of books I've read.
      </p>

      <div class="grid gap-4">
        <NuxtLink
          v-for="book in books"
          :key="book.path"
          :to="book.path"
          class="flex items-start gap-5 p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-accent/50 dark:hover:border-accent/50 transition-all shadow-sm hover:shadow-md"
        >
          <!-- Cover Emoji -->
          <div class="text-4xl leading-none flex-shrink-0 mt-0.5">
            {{ (book as any).coverEmoji || '📖' }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider mb-1">
              <BookOpen class="w-3.5 h-3.5" />
              Book Notes
            </div>
            <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {{ book.title }}
            </h2>
            <p v-if="(book as any).author" class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              by {{ (book as any).author }}
            </p>
            <p class="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
              {{ book.description }}
            </p>
            <div v-if="(book as any).chapterCount" class="mt-3 text-xs text-slate-400 dark:text-slate-500">
              {{ (book as any).chapterCount }} chapters
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-if="!books?.length" class="text-center py-12 text-slate-500 dark:text-slate-400">
        <BookOpen class="w-10 h-10 mx-auto mb-3 opacity-50" />
        <p>No books yet. Check back soon!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BookOpen } from '@lucide/vue'

useHead({ title: 'Books' })
useSeoMeta({
  description: 'Summaries, notes, and chapter-by-chapter breakdowns of books I\'ve read.',
  ogTitle: 'Books — LearnStack',
  ogDescription: 'Summaries, notes, and chapter-by-chapter breakdowns of books I\'ve read.',
})

const { data: books } = await useAsyncData(
  'books-list',
  async () => {
    try {
      const items = await queryCollection('content').all()
      // Only the index.md of each book (path like /books/clean-code)
      return (items || []).filter((d: any) => {
        if (!d.path?.startsWith('/books/')) return false
        // index pages have path = /books/<slug> (no trailing segment)
        const parts = d.path.replace(/^\/books\//, '').split('/')
        return parts.length === 1
      })
    } catch {
      return []
    }
  }
)
</script>
