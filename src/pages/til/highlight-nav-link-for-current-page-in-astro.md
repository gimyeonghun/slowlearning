---
layout: ../../layouts/til_post.astro
title: Highlight Nav Link for Current Page in Astro
published_date: 2025-05-11
reference_url: https://www.cyishere.dev/blog/astro-active-nav-item
---

```javascript
// in the JavaScpit part:
// the `pathname` is sth like - "/about"
const { pathname } = Astro.url;
```

```html
// in the HTML part:
// such as the `slug` is "about"
<a class={pathname.slice(1) === slug ? 'active' : ''} href={`/${slug}`}>
  About
</a>
```

or

```html
// in the HTML part:
<a
  aria-current={pathname.slice(1) === slug ? 'page' : 'false'}
  href={`/${slug}`}
>
  {name}
</a>

// in the CSS part:
a[aria-current="page"] {
  /* the styles for the active nav item */
}
```