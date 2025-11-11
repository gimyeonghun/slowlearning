---
title: "Accidentally writing a fast SAT solver"
date: 2025-08-08
type: link
link: https://blog.danielh.cc/blog/sat
tags: ["scheduling"]
---

> Going back (no pun intended) to the scheduling problem, the solution would be similar. Each "row" would be a class, and from each class, a section would be chosen for the class schedule. By changing is_valid to check for time conflicts instead of queens, the same code can be used to build a schedule.

> To determine if a formula is satisfiable, first convert it to conjunctive normal form, then convert the new formula into a course catalog. Put this into a schedule builder, and you know the answer.