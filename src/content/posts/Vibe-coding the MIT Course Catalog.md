---
title: Vibe-coding the MIT Course Catalogue
date:  2025-08-08
type: link
link: https://stackdiver.com/posts/vibe-coding-the-mit-course-catalog/
tags: ["vibe coding", "scraping"]
---

1. Go to the [MIT Course Picker](https://picker.mit.edu/index0.html) website
2. Copy this code into the console.

```javascript
[...document.querySelectorAll(".course-name")]
.map((e) => e.closest(".course-lens"))
.map((d) => ({
  title: d.querySelector(".course-name")?.textContent,
  description: d.querySelector(".course-description")?.textContent,
  semester: d.querySelector(".course-semester")?.textContent,
  prereq: d.querySelector(`[data-ex-content=".prereqs"]`)?.textContent,
  instructor: d.querySelector(".course-instructor")?.textContent,
  units: d.querySelector(`[data-ex-content=".units"]`)?.textContent,
  level: d.querySelector(`[data-ex-content=".level"]`)?.textContent,
}));
```
 
 You don't need a complex scraper. Query selection will always get the job done. 