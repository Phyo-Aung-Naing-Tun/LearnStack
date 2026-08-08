<template>
  <div>
    <!-- Series header -->
    <header class="mb-8">
      <NuxtLink
        :to="`/tutorials/${series}`"
        class="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-light transition-colors mb-3"
      >
        <ArrowLeft class="w-4 h-4" />
        Back to {{ seriesTitle }}
      </NuxtLink>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
        {{ page?.title || 'Loading...' }}
      </h1>
      <p v-if="page?.description" class="mt-2 text-lg text-slate-500 dark:text-slate-400">
        {{ page.description }}
      </p>
      <div class="flex items-center gap-3 mt-3 text-sm text-slate-500 dark:text-slate-400">
        <span>Day {{ day }}</span>
        <span>·</span>
        <span>{{ seriesTitle }}</span>
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

    <!-- Day Navigation -->
    <TutorialDayNavigator
      :series="series"
      :prev-day="prevDay"
      :next-day="nextDay"
      :completed="dayCompleted"
      @toggle-complete="toggleDayComplete"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'tutorial',
})

import { ArrowLeft } from '@lucide/vue'

const route = useRoute()
const { series, day: dayParam } = route.params
const day = Number(dayParam)

const seriesPath = `/tutorials/${series}`

// Fetch current page by its exact path (standard v3 pattern)
const { data: page } = await useAsyncData(
  `tutorial-${series}-${day}`,
  () => queryCollection('content').path(route.path).first()
)

// Fetch series index (index.md becomes the directory path)
const { data: seriesData } = await useAsyncData(
  `series-${series}`,
  () => queryCollection('content').path(seriesPath).first()
)

// Fetch all days in the series (exclude the index which has no day field)
const { data: allDays } = await useAsyncData(
  `series-days-${series}`,
  async () => {
    try {
      const items = await queryCollection('content').all()
      return (items || [])
        .filter((d: any) => d.path?.startsWith(`${seriesPath}/`) && d.day)
        .sort((a: any, b: any) => (a.day || 0) - (b.day || 0))
    } catch {
      return []
    }
  }
)

const seriesTitle = computed(() =>
  (seriesData.value as any)?.seriesTitle || (page.value as any)?.seriesTitle || String(series).replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
)
const seriesDescription = computed(() =>
  (seriesData.value as any)?.description || (page.value as any)?.seriesDescription || ''
)

const totalDays = computed(() => (allDays.value as any[])?.length || 0)

const dayLinks = computed(() =>
  ((allDays.value as any[]) || []).map((d: any) => ({
    day: d.day,
    title: d.title || `Day ${d.day}`,
  }))
)

// Next / Prev logic
const prevDay = computed(() => {
  const idx = dayLinks.value.findIndex((d: any) => d.day === day)
  return idx > 0 ? dayLinks.value[idx - 1].day : null
})

const nextDay = computed(() => {
  const idx = dayLinks.value.findIndex((d: any) => d.day === day)
  return idx < dayLinks.value.length - 1 ? dayLinks.value[idx + 1].day : null
})

// Progress tracking
const { isCompleted, markCompleted, getSeriesProgress } = useProgress()
const dayCompleted = ref(false)

onMounted(() => {
  dayCompleted.value = isCompleted(String(series), day)
})

const progressPercent = computed(() => getSeriesProgress(String(series), totalDays.value))

function toggleDayComplete() {
  dayCompleted.value = !dayCompleted.value
  if (dayCompleted.value) {
    markCompleted(String(series), day)
  } else {
    if (import.meta.client) {
      const stored = JSON.parse(localStorage.getItem('tutorial-progress') || '{}')
      delete stored[`${series}-day-${day}`]
      localStorage.setItem('tutorial-progress', JSON.stringify(stored))
    }
  }
  // Refresh progress percent
  refreshNuxtData(`series-days-${series}`)
}

// Extract TOC from rendered content
const tocLinks = ref<{ id: string; text: string; depth: number }[]>([])

onMounted(() => {
  // Parse headings from the article for TOC
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

// Provide data to the tutorial layout via shared composable
const tutorialState = useTutorialState()
tutorialState.tocLinks.value = tocLinks.value
tutorialState.seriesSlug.value = String(series)
tutorialState.seriesTitle.value = seriesTitle.value
tutorialState.seriesDescription.value = seriesDescription.value
tutorialState.dayLinks.value = dayLinks.value
tutorialState.currentDay.value = day
tutorialState.progressPercent.value = progressPercent.value

// Keep TOC in sync
watch(tocLinks, (val) => { tutorialState.tocLinks.value = val })
watch(seriesTitle, (val) => { tutorialState.seriesTitle.value = val })
watch(seriesDescription, (val) => { tutorialState.seriesDescription.value = val })
watch(dayLinks, (val) => { tutorialState.dayLinks.value = val })
watch(progressPercent, (val) => { tutorialState.progressPercent.value = val })

// Set page SEO
const dayTitle = computed(() => (page.value as any)?.title || `Day ${day}`)
const dayDescription = computed(() => (page.value as any)?.description || `Day ${day} of ${seriesTitle.value}`)

useHead({ title: dayTitle })
useSeoMeta({
  description: dayDescription,
  ogTitle: dayTitle,
  ogDescription: dayDescription,
  ogImage: `/api/og-image?title=${encodeURIComponent(dayTitle.value)}&description=${encodeURIComponent(dayDescription.value)}`,
  twitterTitle: dayTitle,
  twitterDescription: dayDescription,
  twitterImage: `/api/og-image?title=${encodeURIComponent(dayTitle.value)}&description=${encodeURIComponent(dayDescription.value)}`,
})
</script>
