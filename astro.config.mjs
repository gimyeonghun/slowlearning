// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  site: "https://slowlearner.quest/",
  redirects: {
    "/200-days-of-duolingo": "/2024/August/14/200-days-of-duolingo",
    "/inner-sanctum-of-the-mind": "/2024/August/09/inner-sanctum-of-the-mind",
    "/100-days-duolingo": "2024/May/08/100-days-duolingo",
    "/a-small-update": "/2024/February/29/a-small-update",
    "/weeknotes-4": "/2023/September/10/weeknotes-4",
    "/weeknotes-3": "/2023/August/06/weeknotes-3",
    "/enums-for-managing-multiple-user-actions": "/2023/July/30/enums-for-managing-multiple-user-actions",
    "/weeknotes-2": "/2023/July/30/weeknotes-2",
    "/weeknotes-1": "/2023/July/09/weeknotes-1",
    "/user-sorting-in-swift-and-core-data": "/2023/July/06/user-sorting-in-swift-and-core-data",
    "/task-managers-are-database-interfaces": "/2023/June/15/task-managers-are-database-interfaces",
    "/cbct": "/2023/May/23/cbct",
    "/bootstrap-is-still-pretty-good": "/2023/May/22/bootstrap-is-still-pretty-good",
    "dev-log-5": "/2023/April/21/dev-log-5",
    "/dev-log-4": "/2023/January/29/dev-log-4",
    "/dev-log-3": "/2023/January/08/dev-log-3",
    "/dev-log-2": "/2022/December/31/dev-log-2",
    "/dev-log-1": "/2022/December/30/dev-log-1",
    "/dev-log-miniseries": "/2022/December/29/dev-log-miniseries",
    "/glacial-self-62998": "/2022/September/15/glacial-self-62998",
    "/white-night": "/2022/September/03/white-night"
  }
});