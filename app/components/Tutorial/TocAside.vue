<template>
  <!-- TOC sidebar — hidden on mobile, scrollable on desktop -->
  <aside class="toc-sidebar hidden lg:block w-[220px] shrink-0 overflow-y-auto py-6">
    <nav>
      <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
        On This Page
      </h4>
      <ul class="space-y-1.5 border-l border-slate-200 dark:border-slate-700">
        <li v-for="link in tocLinks" :key="link.id">
          <a
            :href="`#${link.id}`"
            class="block py-1 pl-3 text-sm border-l-2 -ml-px transition-colors"
            :class="link.depth === 3 ? 'pl-6' : ''"
            :style="{
              borderColor: activeId === link.id ? '#0284C7' : 'transparent',
              color: activeId === link.id ? '#0284C7' : undefined,
            }"
            @click.prevent="scrollToHeading(link.id)"
          >
            {{ link.text }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
}

defineProps<{
  tocLinks: TocLink[]
}>()

const activeId = ref<string>('')

function scrollToHeading(id: string) {
  activeId.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Intersection Observer to highlight active heading
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-80px 0px -60% 0px' }
  )

  // Observe all heading elements
  document.querySelectorAll('h2[id], h3[id]').forEach((el) => observer!.observe(el))
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
