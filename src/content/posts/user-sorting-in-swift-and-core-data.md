---
title: User Sorting in Swift and Core Data
date: 2023-07-06
type: post
tags: []
---
User Sorting is an interesting computer science and user experience problem. On the surface, it can seem very straightforward but can get very complicated depending on your implementation.

Unlike traditional sorting algorithms, the heavy work of the sorting is already solved by the database of choice. The difficult part is respecting the user's manual reordering of items outside of their usual metadata.

There is a lot of literature on the subject. I found a [blog post](https://begriffs.com/posts/2018-03-20-user-defined-order.html) from 2018 where the author created a Postgres extension using fractions as the index. Another [solution](https://github.com/fasiha/mudderjs) uses strings for the strings, which means that resorting is not required as much. I personally relied heavily on this [StackOverFlow](https://stackoverflow.com/questions/59742218/swiftui-reorder-coredata-objects-in-list) answer. The solution recomputes the index of each element after the `move` operation is completed.

However, in my eyes, the implementation used in [Things 3](https://culturedcode.com/things/) is the holy grail of user sorting. If you have a sneak peek into their local database, you can see that each record will have an `index` column.

![Slow Learner Quest](https://bear-images.sfo2.cdn.digitaloceanspaces.com/bk-1688638944-0.png)

For the longest time, I was unsure how the index was calculated. However, this [blog post](https://www.appsdissected.com/order-core-data-entities-maximum-speed/) shed some light.

The algorithm is very simple (on paper)
1. Create indices with sufficiently large gaps in-between. Avoid consecutive numbers as much as possible - you want to avoid recomputation.
2. Inserting elements requires knowing the index values of the neighbours, and use the mean of their values for the new index value.
3. In the case that the interval between elements is too close/short, grab all the offending index values and regenerate values. This can be considered a routine 'clean up' of the database.

My attempt included a few more constraints:
1. Rather than calculating the average of its neigbours' indices, the newly inserted element will randomly generate an index using its neighbours as an upper and lower bound.
2. The bottom-most element will always have an index value of 0.
3. I want the methods to be agnostic of the view. The view will provide me information such as the size of the array and the elements. However, I want on querying the database as I can programmatically add items to a list in the future. This will be useful if I ever provide App Intents support in the future (I most likely will no matter what).

#1 has advantages and disadvantages. I like to use big values (the max boundary is 999,999) and I found that I need to recalculate more frequently if I use the average. On the other hand, randomly generating the index value can result in duplicate values, so there is more checking required.

#2 is actually really useful because it helps reset the index values. I noticed that, after several iterations of sorting, the index values can get clustered around a certain range of numbers. Resetting the bottom-most index to 0 allows the list to become more evenly distributed again.

The initial challenge was to understand how SwiftUI's `.onMove` modifier communicates the user's interaction. The [docs](https://developer.apple.com/documentation/swiftui/dynamicviewcontent/onmove(perform:)) show that there are 2 parameters, `IndexSet` and `Int`. The former is a set of all the indices touched, while the latter is where the user tried to move it in the array. I realised that the user's intent of either moving the item further up in the hierarchy or lower can be calculated by comparing the item's initial index and the destination.

So based on this, my plan of attack was:
1. When the user adds an item to the list, its index value is 0. The item before that will be recalculated
2. The same applies if the user drags an item to the very bottom of the list.
3. If the user moves the item further up, check its future neighbours' values to calculate the new index value.
4. The same applies if the user moves the item down.

After the insertion, I also run a `validate` function, which includes `recalculateBounds` and `checkUniqueness`. The former checks if the gaps between the indices are getting too small, so it tries to spread them out based on the boundary provided. The latter checks if items have the same index value and will try to spread them out further.

To make this easier to understand, I have provided the source code below. The [github repository](https://github.com/gimyeonghun/sortorder) is also available. This code is still fresh so I may go in and tidy it up in the future.

My main motivation for writing this post is because I'm sure there are other people who have been struggling with this problem too. While my solution may not be perfect, hopefully it can provide a good launching point for others.

```swift
import Foundation
import CoreData

final class ContentViewController {
	static let shared = ContentViewController()
    private var persistence = PersistenceController.shared

    func add(item: Item) {
        item.index = 0
        var fetch = fetchLowestItems()
        if fetch.count > 1 {
            fetch.removeFirst() // discard the first item because it'll always be the one that we just added
            let lowest = fetch.removeFirst()
            if lowest.index >= 0 {
                print(fetch.count)
                if fetch.count == 1 {
                    let neighbour = fetch.removeFirst()
                    lowest.index = assignIndex(start: neighbour.index, end: 0)
                } else {
                    lowest.index = assignIndex(end: 0)
                }
            }
        }
    }

    func move(item: Item, origin: Int, destination: Int) {
        print("Origin: \(origin)")
        print("Destination: \(destination)")

        if destination == 0 {
            if let firstItem = fetchHighestIndex() {
                item.index = assignIndex(end: firstItem.index)
            }
        } else if origin > destination {
            // `move` will always insert it below the destination when trying to move
            if let parentNeighbour = fetchItem(at: destination),
               let descNeighbour = fetchDescendingNeighbour(at: destination) {
                item.index = assignIndex(start: parentNeighbour.index, end: descNeighbour.index)
                validate([descNeighbour, item, parentNeighbour])
            }
        } else if origin < destination {
            if let firstDescNeighbour = fetchItem(at: destination) {
                if let secDescNeighbour = fetchDescendingNeighbour(at: destination) {
                    item.index = assignIndex(start: firstDescNeighbour.index, end: secDescNeighbour.index)
                    validate([secDescNeighbour, item, firstDescNeighbour])
                } else if let parentNeighbourIndex = fetchIndex(at: destination - 1) {
                    firstDescNeighbour.index = assignIndex(start: parentNeighbourIndex, end: 0)
                    item.index = 0
                }
            }
        }
    }

    private func fetchHighestIndex() -> Item? {
        let request = NSFetchRequest<Item>(entityName: "Item")
        request.sortDescriptors = [NSSortDescriptor(keyPath: \Item.index, ascending: true)]
        request.fetchLimit = 1
        do {
            let item = try self.persistence.container.viewContext.fetch(request)
            return item.first!
        } catch {
            return nil
        }
    }

    private func fetchLowestItems() -> [Item] {
        let request = NSFetchRequest<Item>(entityName: "Item")
        request.predicate = NSPredicate(format: "%K <= 0", #keyPath(Item.index))
        request.sortDescriptors = [NSSortDescriptor(keyPath: \Item.index, ascending: false), NSSortDescriptor(keyPath: \Item.timestamp, ascending: false)]
        request.fetchLimit = 3
        do {
            let items = try self.persistence.container.viewContext.fetch(request)
            return items
        } catch {
            return []
        }
    }

    private func fetchDescendingNeighbour(at destination: Int) -> Item? {
        let request = NSFetchRequest<Item>(entityName: "Item")
        request.fetchOffset = destination
        request.sortDescriptors = [NSSortDescriptor(keyPath: \Item.index, ascending: true)]
        request.fetchLimit = 1
        do {
            guard let item = try self.persistence.container.viewContext.fetch(request).first else { return nil }
            return item
        } catch {
            return nil
        }
    }

    private func fetchDescendingNeighbour(below index: Int64) -> Item? {
        let request = NSFetchRequest<Item>(entityName: "Item")
        request.predicate = NSPredicate(format: "%K > %ld", #keyPath(Item.index), index)
        request.sortDescriptors = [NSSortDescriptor(keyPath: \Item.index, ascending: true)]
        request.fetchLimit = 1
        do {
            guard let item = try self.persistence.container.viewContext.fetch(request).first else { return nil }
            return item
        } catch {
            return nil
        }
    }

    private func fetchParentNeighbour(above index: Int64) -> Item? {
        let request = NSFetchRequest<Item>(entityName: "Item")
        request.predicate = NSPredicate(format: "%K <= %ld", #keyPath(Item.index), index)
        request.sortDescriptors = [NSSortDescriptor(keyPath: \Item.index, ascending: true)]
        request.fetchLimit = 1
        do {
            guard let item = try self.persistence.container.viewContext.fetch(request).first else { return nil }
            return item
        } catch {
            return nil
        }
    }

    private func fetchItem(at destination: Int) -> Item? {
        let request = NSFetchRequest<Item>(entityName: "Item")
        request.fetchOffset = destination - 1
        request.sortDescriptors = [NSSortDescriptor(keyPath: \Item.index, ascending: true)]
        request.fetchLimit = 1
        do {
            guard let item = try self.persistence.container.viewContext.fetch(request).first else { return nil }
            return item
        } catch {
            return nil
        }
    }

    private func fetchIndex(at destination: Int) -> Int64? {
        guard let item = try? fetchItem(at: destination) else { return nil }
        return item.index
    }

    /// Checks whether there's enough space for the items to be differeniated
    private func validate(_ items: [Item]) {
        recalculateBounds(items)
        checkUniqueness(items)
        cleanUp()
    }

    private func recalculateBounds(_ items: [Item]) {
        if let upperBound = items.max(by: { $0.index < $1.index }),
           let lowerBound = items.min(by: { $0.index < $1.index }) {

            if abs(upperBound.index - lowerBound.index) < 10 {
                var newUpperBoundIndex = fetchParentNeighbour(above: upperBound.index)?.index ?? -99999
                if abs(newUpperBoundIndex - upperBound.index) < 100 {
                    newUpperBoundIndex = -99999
                }
                var newLowerBound = fetchDescendingNeighbour(below: lowerBound.index)?.index ?? 0
                if abs(lowerBound.index - newLowerBound) < 100 {
                    newLowerBound = fetchDescendingNeighbour(below: newLowerBound)?.index ?? 0
                }

                let range = abs(newUpperBoundIndex - newLowerBound) / 3
                print("range is \(range); lower: \(newLowerBound) - upper: \(newUpperBoundIndex)")
                print("Starting from: \(newLowerBound)")

                for index in stride(from: newLowerBound, through: newUpperBoundIndex, by: Int64.Stride(range)) {
                    items[Int(index)].index = -range * index
                }

                print("Finishing at: \(newUpperBoundIndex)")

            }
        }
    }

    private func checkUniqueness(_ items: [Item]) {
        let request = NSFetchRequest<Item>(entityName: "Item")

        for item in items {
            request.predicate = NSPredicate(format: "%K == %ld AND %K != %@", #keyPath(Item.index), item.index, #keyPath(Item.timestamp), item.timestamp! as CVarArg)
            request.sortDescriptors = [NSSortDescriptor(keyPath: \Item.index, ascending: true)]
            request.fetchLimit = 1
            if let similarItem = try? self.persistence.container.viewContext.fetch(request).first,
               let upperBound = fetchParentNeighbour(above: item.index),
               let lowerBound = fetchDescendingNeighbour(below: item.index) {
                similarItem.index = Int64.random(in: similarItem.index...upperBound.index)
                item.index = Int64.random(in: lowerBound.index...similarItem.index)
            }
        }
    }

    private func cleanUp() {
        if let zeroIndexItem = fetchLowestItems().first {
            zeroIndexItem.index = 0
        }
    }

    /// This is a dumb function. We need to write higher level functions for validation.
    private func assignIndex(start: Int64 = -99999, end: Int64) -> Int64 {
        return Int64.random(in: start...end)
    }
}

```
