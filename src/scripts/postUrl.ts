import type { CollectionEntry } from "astro:content";

function getPostUrl(post: CollectionEntry<"posts">) {
  const date = post.data.date;
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = String(date.getDate()).padStart(2, "0");
  const slug = post.slug.replace(/^\d{4}-\d{2}-\d{2}-/, "");
  return `/${year}/${month}/${day}/${slug}`;
}

export default getPostUrl;
