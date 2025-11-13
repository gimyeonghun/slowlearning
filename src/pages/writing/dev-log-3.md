---
layout: ../../layouts/blog_post.astro
title: Dev Log &#35;3
published_date: 2023-01-08:46.412493+00:00
---

I took a little break from development, but the next action on the roadmap was enabling *note taking*. The app would allow users to track their book reading through sessions, which opens up a timer and a scratchpad to jot down notes and thoughts. Afterwards, the scratchpad would split into different notes based on headers that the user can later reflect on. That means that the scratchpad can be thought of as a tree - there will be multiple nodes/notes branching from different headings.

The initial plans for the app was to create Markdown notes, and I wanted to create formatting based on syntax. My Mastodon posts detailed my [journey](https://aus.social/@hoon/109654561491924429) (also you can follow me [here!](https://aus.social/@hoon)) where I created some basic parsing units, such as `Literal` and [`Match`](https://aus.social/@hoon/109655010733176276). I had to give it up for the time being due to complexity but I still think it's worthwhile to write about it.

The `Foundation` framework provides `NSScanner` or `Scanner`, which has backtracking to maintain the position of the parsed string. But my research showed that some key methods were deprecated so I felt hesitant to move forward with it. [TextMarkupKit](https://github.com/bdewey/TextMarkupKit) initially gave me the idea to create a Packrat Parser, but I had trouble using their text editor.

In the future, I may write more about this if I implement a parsing grammar in the future. In the meantime, if you want to try it yourself, these links may be prove useful:

1. [Guido van Rossum's PEG Parsing Series](https://medium.com/@gvanrossum_83706/peg-parsing-series-de5d41b2ed60?sk=0a7ce9003b13aae8126a4a23812eb035)
2. [String parsing in Swift](https://www.swiftbysundell.com/articles/string-parsing-in-swift/)
3. [NSScanner](https://nshipster.com/nsscanner/)
4. [Patterns](https://github.com/kareman/Patterns)
5. [Packrat Parsing from Scratch](https://blog.bruce-hill.com/packrat-parsing-from-scratch)
6. [MarkdownParser.swift](https://github.com/JohnSundell/Ink/blob/master/Sources/Ink/API/MarkdownParser.swift)
