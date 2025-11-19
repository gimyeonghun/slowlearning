---
title: "Dev Log #4"
date: 2023-01-29
type: post
tags: []
slug: "dev-log-4"
---
To track books, users need to be able to add them from somewhere. I created a search feature which uses Google Book's API (but I might switch to Amazon soon!) but it only returns 10-40 results at a time. During the weekend, I finally buckled down and created a lazy loading/infinite scroll.

SwiftUI's `List` or `ScrollView` is notorious for its [bugs](https://mjtsai.com/blog/2023/01/27/swiftui-in-timing-app/). So I wasn't feeling confident about tackling the problem. Luckily, this [article](https://www.donnywals.com/implementing-an-infinite-scrolling-list-with-swiftui-and-combine/) provided great guidance.

The basic principle is that each List Item will be appear lazily. They all have a `.onAppear` modifier which checks whether the list item is near the end of the current list. If it is, then we will fetch more items based on a new index.

In conclusion, the problem wasn't very difficult, but I am very proud of implementing this feature. It is one of those minor features that greatly improve the user experience. I love scrolling endlessly too, so I am one very happy (amateur) developer
