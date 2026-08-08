<template>
  <div>
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
          Tutorials
        </h1>
        <p class="text-slate-500 dark:text-slate-400 mb-8">
          Step-by-step guided series to master new skills.
        </p>

        <div class="grid gap-4">
          <NuxtLink
            v-for="tutorial in tutorials"
            :key="tutorial.path"
            :to="tutorial.path"
            class="block p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-accent/50 dark:hover:border-accent/50 transition-all shadow-sm hover:shadow-md"
          >
            <div class="flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider mb-2">
              <GraduationCap class="w-4 h-4" />
              Tutorial Series
            </div>
            <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100">
              {{ tutorial.title }}
            </h2>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {{ tutorial.description }}
            </p>
          </NuxtLink>
        </div>

        <div v-if="!tutorials?.length" class="text-center py-12 text-slate-500 dark:text-slate-400">
          <GraduationCap class="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p>No tutorials yet. Check back soon!</p>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { GraduationCap } from '@lucide/vue'

useHead({ title: 'Tutorials' })
useSeoMeta({
  description: 'Step-by-step guided series to master new skills.',
  ogTitle: 'Tutorials — LearnStack',
  ogDescription: 'Step-by-step guided series to master new skills.',
})

const { data: tutorials } = await useAsyncData(
  'tutorials-list',
  async () => {
    try {
      const items = await queryCollection('content').all()
      return (items || []).filter((d: any) => d.path?.startsWith('/tutorials/') && !d.day)
    } catch {
      return []
    }
  }
)
</script>
