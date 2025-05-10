---
layout: ../../layouts/blog_post.astro
title: Dev Log &#35;2
published_date: 2022-12-31T00:00:00+00:00
---

*Edited and updated 30th January 2023*

During the holidays, I've been studying other codebases to understand how to write better code. In particular, Apple's [CareKit](https://github.com/carekit-apple/CareKit) framework has been largely beneficial in knowing how to structure my Core Data models better. A lot of tutorials mix views and models together for simplicity, but this can quickly become unwieldy as the codebase becomes more complex.

The CareKit code is interesting because all the transactions, such as `insert`, `update`, `delete`, were funnelled through the aptly named `transaction()` method. Core Data classes are prefixed with 'CD' and `structs` are passed around instead. I liked this approach because it created several layers of abstraction between the actual database and the user (something I've learned from using Elixir's [Phoenix](https://www.phoenixframework.org) framework). It also heavily utilised closures which enabled async. However, while it was straightforward to add new data, it was challenging to update and delete objects. This is because structs are `value types`, so new instances are created while classes, being `reference  types` enabled direct manipulation of the objects. It made sense for the CareKit framework because data was 'soft-deleted' (the `DeletedDate` of the object was switched from `nil` to the date of deletion) and updates were essentially inserts with a pointer to the most current version. This may be ideal if you want to maintain a version history of the writes, but it was overkill for a CRUD app.

I initially found a compromise where I would create a new struct,  compare it to an existing `UUID` in the database and then rewrite all the properties of that existing object. However, this was unwieldy because it felt awkward to write the update logic. I also felt that this was against the principles of Core Data, so I thought there could be a better solution.

This [article](https://obscuredpixels.com/combining-core-data-with-generics) enlightened me. I really enjoyed writing a closure for creating new classes. It felt so fresh compared to the usual `var object = <Core Data Class>(context:)` dance. However, I found the extra code at the end felt awkward too. Speaking metaphorically, writing the `.sink` and `.receive` methods felt like I was waddling with toilet paper trailing from my bum. There had to be something better.

I'm really happy with the solution I conceived. It uses the best of both worlds. I can still write my closures and I can still check if the operation completed successfully. This is the final code I came up with:

```swift
class Storage<Entity: NSManagedObject> {
    private let context = StorageProvider.shared.container.viewContext

    func add(_ body: @escaping (inout Entity) -> Void, completion: @escaping (Result<Entity, StorageError>) -> Void) {
        context.perform {
            var entity = Entity(context: self.context)
            body(&entity)
            do {
                try self.context.save()
                completion(.success(entity))
            } catch {
                completion(.failure(.invalidValue(reason: error.localizedDescription)))
            }
        }
    }

    func update(_ entity: Entity, _ completion: @escaping (Result<Entity, StorageError>) -> Void) {
        context.perform {
            do {
                try self.context.save()
                completion(.success(entity))
            } catch {
                completion(.failure(.deleteFailed(reason: error.localizedDescription)))
            }
        }
    }

    func delete(_ entity: Entity, _ completion: @escaping (Result<Void, StorageError>) -> Void) {
        context.perform {
            do {
                self.context.delete(entity)
                try self.context.save()
                completion(.success(()))
            } catch {
                completion(.failure(.deleteFailed(reason: error.localizedDescription)))
            }
        }
    }
}
```
