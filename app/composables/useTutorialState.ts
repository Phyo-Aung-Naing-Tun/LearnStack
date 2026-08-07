// Shared reactive state between tutorial layout and page
interface TocLink {
  id: string
  text: string
  depth: number
}

interface DayLink {
  day: number
  title: string
}

// Module-level state — shared across all components
const tocLinks = ref<TocLink[]>([])
const seriesSlug = ref('')
const seriesTitle = ref('')
const seriesDescription = ref('')
const dayLinks = ref<DayLink[]>([])
const currentDay = ref(1)
const progressPercent = ref(0)

export const useTutorialState = () => {
  return {
    tocLinks,
    seriesSlug,
    seriesTitle,
    seriesDescription,
    dayLinks,
    currentDay,
    progressPercent,
  }
}
