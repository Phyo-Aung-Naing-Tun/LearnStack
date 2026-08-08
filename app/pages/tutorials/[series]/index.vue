<template>
  <div>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <!-- Breadcrumb -->
        <NuxtLink
          to="/tutorials"
          class="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-light transition-colors mb-6"
        >
          <ArrowLeft class="w-4 h-4" />
          All Tutorials
        </NuxtLink>

        <!-- Series Title -->
        <h1 class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
          {{ seriesTitle }}
        </h1>
        <p class="text-slate-500 dark:text-slate-400 mb-8">
          {{ seriesDescription }}
        </p>

        <!-- Days list -->
        <div class="grid gap-3">
          <NuxtLink
            v-for="day in days"
            :key="day.day"
            :to="`/tutorials/${series}/${day.day}`"
            class="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-accent/50 dark:hover:border-accent/50 transition-all"
          >
            <span
              class="flex-shrink-0 w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center"
              :class="isDayCompleted(day.day)
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'"
            >
              <Check v-if="isDayCompleted(day.day)" class="w-4 h-4" />
              <span v-else>{{ day.day }}</span>
            </span>
            <div>
              <h3 class="font-semibold text-slate-800 dark:text-slate-200">{{ day.title }}</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ day.description }}</p>
            </div>
            <ChevronRight class="w-5 h-5 ml-auto text-slate-400" />
          </NuxtLink>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Check, ChevronRight } from '@lucide/vue'

const route = useRoute()
const { series } = route.params
const { isCompleted: isDayCompleted } = useProgress()

const seriesPath = `/tutorials/${series}`

// Fetch series index (index.md path = directory path)
const { data: seriesIndex } = await useAsyncData(
  `series-index-${series}`,
  () => queryCollection('content').path(seriesPath).first()
)

// Fetch all days (filter/sort in JS since day is in meta JSON)
const { data: days } = await useAsyncData(
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
  (seriesIndex.value as any)?.seriesTitle || String(series).replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
)
const seriesDescription = computed(() =>
  (seriesIndex.value as any)?.description || (seriesIndex.value as any)?.seriesDescription || ''
)

useHead({ title: seriesTitle.value })
useSeoMeta({
  description: seriesDescription.value,
  ogTitle: computed(() => `${seriesTitle.value} — LearnStack`),
  ogDescription: seriesDescription,
})
</script>
