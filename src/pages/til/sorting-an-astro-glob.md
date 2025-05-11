---
layout: ../../layouts/til_post.astro
title: Sorting an Astro Glob
published_date: 2025-05-05
reference_url: https://caseyjamesperno.com/blog/sort-astro-glob/
---

```javascript
const posts = await Astro.glob('../content/blog/**/*.md');
posts.sort((a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date));
```
