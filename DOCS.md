# LearnStack — Technical Documentation

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Nuxt 4** (with Vue 3 Composition API) |
| Content | **@nuxt/content v3** (SQL-backed, Git-based CMS) |
| Styling | **Tailwind CSS** + **@tailwindcss/typography** |
| Dark Mode | **@nuxtjs/color-mode** (class strategy, system preference) |
| Icons | **@lucide/vue** |
| Schema | **Zod** (content frontmatter validation) |

---

## Project Architecture

```
my-blog/
├── nuxt.config.ts              # Nuxt + modules configuration
├── tailwind.config.js          # Tailwind + typography theme
├── content.config.ts           # @nuxt/content collections & Zod schema
├── app/                        # ★ Nuxt 4 source root
│   ├── app.vue                 # Root: <NuxtLayout> → <NuxtPage>
│   ├── assets/css/main.css     # Global prose + dark mode styles
│   ├── composables/
│   │   ├── useProgress.ts      # localStorage progress tracking
│   │   └── useTutorialState.ts  # Shared state between tutorial layout & page
│   ├── layouts/
│   │   ├── default.vue         # AppHeader + <slot />
│   │   └── tutorial.vue        # 3-col: SeriesNav | content | TocAside
│   ├── components/
│   │   ├── AppHeader.vue       # Sticky nav + ThemeSwitcher
│   │   ├── ThemeSwitcher.vue   # Sun/Moon toggle (ClientOnly)
│   │   ├── Tutorial/
│   │   │   ├── SeriesNav.vue   # Left sidebar (desktop) / slide-over (mobile)
│   │   │   ├── TocAside.vue    # Right sidebar sticky TOC + scroll spy
│   │   │   └── DayNavigator.vue # Next/Prev + Mark Complete + mobile bar
│   │   └── content/
│   │       └── ProsePre.vue    # Custom <pre> with copy button
│   └── pages/
│       ├── index.vue           # Homepage: hero + featured tutorial + recent posts
│       ├── blog/
│       │   ├── index.vue       # Blog listing (sorted by date DESC)
│       │   └── [slug].vue      # Individual blog post
│       └── tutorials/
│           ├── index.vue       # All tutorial series
│           └── [series]/
│               ├── index.vue   # Series overview (day list)
│               └── [day].vue   # Day content (3-col layout)
└── content/                    # ★ Markdown content (Git-based)
    ├── blog/
    │   ├── hello-world.md
    │   ├── getting-started-nuxt.md
    │   └── async-await-javascript.md
    └── tutorials/
        └── learn-js-in-5-days/
            ├── index.md        # Series metadata
            ├── 1.md            # Day 1
            └── 2.md            # Day 2
```

---

## Key Design Decisions

### 1. Why Nuxt 4's `app/` directory?
Nuxt 4 uses the `app/` directory as the source root (pages, layouts, components, composables all go under `app/`). This is different from Nuxt 3 where they live at the project root.

### 2. @nuxt/content v3 vs v2
| v2 | v3 |
|----|-----|
| `queryContent()` with object-based where | `queryCollection('name')` with SQL-like `.where(field, operator, value)` |
| `_path` field | `path` field |
| `findOne()` / `find()` | `first()` / `all()` |
| Implicit content structure | Explicit `content.config.ts` with Zod schemas |
| Frontmatter auto-detected | Frontmatter fields must be declared in schema to be queryable |

### 3. Shared State Architecture (useTutorialState)
The tutorial layout and the `[day].vue` page need to share data (series title, day links, TOC, progress). Instead of Vue's `provide/inject` (which fails due to setup timing in parent-child hierarchy), we use a **module-level singleton composable**:

```ts
// Module-level refs — shared across all components
const seriesTitle = ref('')
const dayLinks = ref<DayLink[]>([])
// ...

export const useTutorialState = () => ({ seriesTitle, dayLinks, /* ... */ })
```

Both `layouts/tutorial.vue` and `pages/tutorials/[series]/[day].vue` call `useTutorialState()` and get the same reactive refs.

### 4. Layout Selection
| Page | Layout | How |
|------|--------|-----|
| Home, Blog, Tutorials list, Series overview | `default` | Automatic (no `definePageMeta`) |
| Tutorial day page | `tutorial` | `definePageMeta({ layout: 'tutorial' })` |

### 5. Content Fetching Pattern

All content queries follow this pattern:

```ts
const { data } = await useAsyncData('unique-key', () =>
  queryCollection('content')       // auto-imported
    .where('path', 'LIKE', '/blog/%')  // SQL-like filters
    .all()                             // or .first()
)

// Filter/sort frontmatter fields in JS since they're in meta JSON
const sorted = (data.value || [])
  .filter(d => d.day)           // day is in meta, filter client-side
  .sort((a, b) => a.day - b.day)
```

**Important**: Frontmatter fields like `day`, `tags`, `series` are stored in a `meta` JSON column in SQLite. The `queryCollection` auto-imported function handles parsing, but `.order('day', 'ASC')` does NOT work because `day` is not a real SQL column. Always sort/filter these in JavaScript.

---

## Component Reference

### `ProsePre.vue` — Code Block with Copy Button

Overrides Nuxt Content's default `<pre>` rendering. Receives `code` (string) and `language` (string) props from ContentRenderer. Adds:
- Language label in header bar
- Copy button using `navigator.clipboard.writeText()`
- Visual feedback (Check icon + "Copied!" for 2 seconds)

### `TocAside.vue` — Table of Contents

- Receives `tocLinks: { id, text, depth }[]` prop
- Uses `IntersectionObserver` to highlight the currently visible heading
- Links scroll smoothly to `#heading-id`
- Only visible on desktop (`lg:block`)

### `SeriesNav.vue` — Day Navigation Sidebar

- **Desktop**: Fixed 250px left sidebar with sticky positioning
- **Mobile**: Slide-over drawer with backdrop, triggered by floating button
- Shows progress bar with percentage
- Each day link shows a checkmark (completed) or day number
- Uses `useProgress()` composable for completion state

### `DayNavigator.vue` — Next/Previous Navigation

- Desktop: Inline nav with Previous Day / Mark Complete / Next Day
- Mobile: Fixed bottom bar with Prev / Complete / Next
- Mark Complete toggles localStorage via `useProgress()`

### `ThemeSwitcher.vue`

Wrapped in `<ClientOnly>` to prevent SSR hydration mismatch (server renders system default, client renders user preference).

---

## Content Schema (`content.config.ts`)

```ts
schema: z.object({
  // Tutorial fields
  day:          z.number().optional(),
  series:       z.string().optional(),
  seriesTitle:  z.string().optional(),
  seriesDescription: z.string().optional(),
  dayCount:     z.number().optional(),
  // Blog fields
  date:         z.string().optional(),   // "2026-08-01"
  tags:         z.array(z.string()).optional(),
  // Common
  description:  z.string().optional(),
})
```

---

## Styling System

### Color Palette
| Mode | Background | Card | Text | Accent |
|------|-----------|------|------|--------|
| Light | `slate-50` (#F8FAFC) | White | `slate-800` (#1E293B) | Sky 600 (#0284C7) |
| Dark | `slate-900` (#0F172A) | `slate-800` (#1E293B) | `slate-200` (#E2E8F0) | Sky 400 (#38BDF8) |

### Typography
- Content uses `prose prose-slate dark:prose-invert` with `max-w-none` + `leading-relaxed`
- Global smooth scroll via `html { scroll-behavior: smooth }`
- `scroll-mt-20` on headings for sticky header offset
- Code blocks: rounded borders, custom header bar via ProsePre

### Responsive Breakpoints
- **≥1024px**: 3-column (250px nav + flex-1 content + 220px TOC)
- **<1024px**: Single column + slide-over nav + sticky bottom bar
