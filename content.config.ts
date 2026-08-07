import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        day: z.number().optional(),
        series: z.string().optional(),
        seriesTitle: z.string().optional(),
        seriesDescription: z.string().optional(),
        dayCount: z.number().optional(),
        description: z.string().optional(),
        date: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
})
