---
title: "Ollama launches a new front-end app"
date: 2025-08-01
type: post
tags: ["ai"]
---

I’ve just tried it now. It’s nice to be able to manage chats now. I asked `llama3.2:3b` to write a 2048 clone. I miss the Claude artefacts option.  

I guess the `llm` CLI app will be phased out now. 

I need to really try my own hand at making one of these. It doesn’t seem too hard.

In fact, [thorum](https://news.ycombinator.com/item?id=44741699) says that it’s easier than ever:

> If you’re a power user of these LLMs and have coding experience, I actually recommend just whipping together your own bespoke chat UI that you can customize however you like. Grab any OpenAI compatible endpoint for inference and a frontend component framework (many of which have added standard Chat components) - the rest is almost trivial. I threw one together in a week with Gemini’s assistance and now I use it every day. Is it production ready? Hell no but it works exactly how I want it to and whenever I find myself saying “I wish it could do XYZ…” I just add it.

Looking at [Bolt](https://boltai.com) for a native Mac experience. 

[Conspiracy theories](https://news.ycombinator.com/item?id=44741239):

> Sure, those are all difficult problems. Problems that single devs are dealing with every day and figuring out. Why is it so hard for Ollama?
>
>
> What seems to be true is that Ollama wants to be a solution that drives the narrative and wants to choose for its users rather than with them. It uses a proprietary model library, it built itself on llama.cpp and didn't upstream its changes, it converted the standard gguf model weights into some unusable file type that only worked with itself, etc.
>
>
> Sorry but I don't buy it. These are not intractable problems to deal with. These are excuses by former docker creators looking to destroy another ecosystem by attempting to coopt it for their own gain.

These are valid criticisms I’ve hard about Ollama. I guess I never really looked into the history behind the company. 

Here’s a good [rundown](https://medium.com/@omkamal/ollama-the-landscape-for-a-powerful-llm-from-meta-ai-6792d7dad718).

Turns out Ollama was in the [W21 YC Program](https://pitchbook.com/profiles/company/537457-42#funding). This makes a bit more sense - they’re completely altruistic. 

---

- See also: The [Hacker News Discussion](https://news.ycombinator.com/item?id=44739632) to see people’s reaction. Some people believe that this will be the gateway to connecting to remote servers. 
- See also: A [comment](https://news.ycombinator.com/item?id=44740957) about different chat interfaces