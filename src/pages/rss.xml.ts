import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (await getCollection("posts")).filter(
    (post) => !post.data.draft,
  ); // Exclude drafts from RSS

  const sortedPosts = posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: "My Blog",
    description: "A blog about things I find interesting",
    site: context.site || "https://yourdomain.com",
    items: sortedPosts.map((post) => {
      const date = post.data.date;
      const year = date.getFullYear();
      const month = date.toLocaleString("en-US", { month: "long" });
      const day = String(date.getDate()).padStart(2, "0");
      const slug = post.slug.replace(/^\d{4}-\d{2}-\d{2}-/, "");
      const link = `/${year}/${month}/${day}/${slug}`;

      let title = post.data.title;
      if (post.data.type === "link") {
        title = `${title} →`;
      } else if (post.data.type === "quote") {
        title = `${title} (Quote)`;
      }

      return {
        title,
        pubDate: post.data.date,
        link,
        description: post.body.substring(0, 200) + "...",
        categories: post.data.tags || [],
      };
    }),
    customData: `en-us`,
  });
}
