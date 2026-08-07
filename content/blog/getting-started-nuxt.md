---
title: "Getting Started with Nuxt 3"
description: "Learn how to set up a Nuxt 3 project from scratch and understand the core concepts."
date: 2026-08-03
tags: ["nuxt", "vue", "tutorial"]
---

# Getting Started with Nuxt 3

Nuxt 3 is a powerful framework built on top of Vue 3 that provides an excellent developer experience. In this post, I'll walk you through the basics.

## Why Nuxt?

Nuxt comes with many built-in features:

| Feature | Description |
|---------|-------------|
| **File-based Routing** | Pages are automatically routed based on the `pages/` directory |
| **Auto-imports** | Components, composables, and utils are auto-imported |
| **SSR & SSG** | Server-side rendering and static site generation out of the box |
| **Modules** | Rich ecosystem of modules for all common needs |

## Create a Nuxt App

Getting started is simple:

```bash
npx nuxi@latest init my-app
cd my-app
npm run dev
```

## Your First Page

Create `pages/index.vue`:

```vue
<template>
  <div>
    <h1>Hello Nuxt!</h1>
    <p>Welcome to my Nuxt application.</p>
  </div>
</template>
```

## Adding Content

Nuxt Content lets you write your content in Markdown:

```ts
// content.config.ts
import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
    }),
  },
})
```

## Next Steps

- Explore [Nuxt Modules](https://nuxt.com/modules)
- Learn about [Nuxt Content](https://content.nuxt.com)
- Join the [Nuxt Discord](https://discord.nuxtjs.org)

That's it for now — happy building!
