import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
    return rss({
        // `<title>` field in output xml
        title: "Slow Learner's Quest",
        // `<description>` field in output xml
        description: "Brian Kim's humble site of learnings",
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#site
        site: context.site,
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: await pagesGlobToRssItems(import.meta.glob('./writing/*.{md,mdx}')),
        // (optional) inject custom xml
        customData: `<language>en-us</language>`,
    });
}