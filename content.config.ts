import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        // Tutorial fields
        day: z.number().optional(),
        series: z.string().optional(),
        seriesTitle: z.string().optional(),
        seriesDescription: z.string().optional(),
        dayCount: z.number().optional(),
        // Shared fields
        description: z.string().optional(),
        date: z.string().optional(),
        tags: z.array(z.string()).optional(),
        // Book fields
        chapter: z.number().optional(),
        bookTitle: z.string().optional(),
        bookSlug: z.string().optional(),
        author: z.string().optional(),
        chapterCount: z.number().optional(),
        coverEmoji: z.string().optional(),
      }),
    }),
  },
})
