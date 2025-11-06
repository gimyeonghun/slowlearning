import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    type: z.enum(["post", "link", "quote"]),
    tags: z.array(z.string()).optional(),
    // For link posts
    link: z.string().url().optional(),
    // For quote posts
    author: z.string().optional(),
    source: z.string().url().optional(),
    permalink: z.string().url().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
