---
layout: ../../layouts/blog_post.astro
title: Enums for Managing Multiple User Actions
published_date: 2023-07-30:01.582179+00:00
---

This is a really interesting [article](https://azamsharp.com/2023/02/28/building-large-scale-apps-swiftui.html) for building large scale SwiftUI apps. There is some sage wisdom here.

The lesson I particularly learnt from the article is `enums`. They are so handy for when you don't want to expose your entire view. Additionally, you can avoid using View Models to power your user interactions which makes your view more reusable (something I try to achieve for building SwiftUI previews).

Here is the example that they provide in the article:

```swift
struct ReminderCellView: View {
    let index: Int
    let onEvent: (ReminderCellEvents) -> Void

    var body: some View {
        HStack {
            Image(systemName: "square")
                .onTapGesture {
                    onEvent(.onChecked(index))
                }
            Text("ReminderCellView \(index)")
            Spacer()
            Image(systemName: "trash")
                .onTapGesture {
                    onEvent(.onDelete(index))
                }
        }
    }
}

struct ContentView: View {
    var body: some View {
        List(1...20, id: \.self) { index in
            ReminderCellView(index: index) { event in
                switch event {
                    case .onChecked(let index):
                        print(index)
                    case .onDelete(let index):
                        print(index)
                }
            }
        }
    }
}
```
