// Shared reactive state between book layout and page
interface TocLink {
  id: string
  text: string
  depth: number
}

interface ChapterLink {
  chapter: number
  title: string
}

// Module-level state — shared across all components
const tocLinks = ref<TocLink[]>([])
const bookSlug = ref('')
const bookTitle = ref('')
const bookAuthor = ref('')
const chapterLinks = ref<ChapterLink[]>([])
const currentChapter = ref(1)
const progressPercent = ref(0)

export const useBookState = () => {
  return {
    tocLinks,
    bookSlug,
    bookTitle,
    bookAuthor,
    chapterLinks,
    currentChapter,
    progressPercent,
  }
}
