---
title: "You Should Write An Agent"
type: link
link: "https://fly.io/blog/everyone-write-an-agent/"
tags: []
date: 2025-11-12
slug: "you-should-write-an-agent"
---

## Code

The full code from the article:

```python
import json
import subprocess
from openai import OpenAI

client = OpenAI()

tools = [{
    "type": "function",
    "name": "ping",
    "description": "ping some host on the Internet",
    "parameters": {
        "type": "object",
        "properties": {
            "host": {
                "type": "string",
                "description": "hostname or IP",
            },
        },
        "required": ["host"],
    },
}]

context = []

def ping(host=""):
    try:
        result = subprocess.run(
                ["ping", "-c", "5", host],
                text=True,
                stderr=subprocess.STDOUT,
                stdout=subprocess.PIPE)
        return result.stdout
    except Exception as e:
        return f"error: {e}"

def call(tools):
    return client.responses.create(model="gpt-5", tools=tools, input=context)

def tool_call(item):
    result = ping(**json.loads(item.arguments))
    return [item, {
        "type": "function_call_output",
        "call_id": item.call_id,
        "output": result
    }]

def handle_tools(tools, response):
    if response.output[0].type == "reasoning":
        context.append(response.output[0])
    osz = len(context)
    for item in response.output:
        if item.type == "function_call":
            context.extend(tool_call(item))
    return len(context) != osz

def process(line):
    context.append({"role": "user", "content": line})
    response = call(tools)

    while handle_tools(tools, response):
        response = call(tools)
    context.append({"role": "assistant", "content": response.output_text})
    return response.output_text

def main():
    while True:
        line = input("> ")
        result = process(line)
        print(f">>> {result}\n")

if __name__ == "__main__":
    main()
```


https://transitions.substack.com/p/what-burning-26-billion-prompt-tokens

https://github.com/vinhnx/vtcode

https://ampcode.com/how-to-build-an-agent

https://github.com/gustofied/P2Engine

https://x.com/rerundotio/status/1968806896959402144

https://simonwillison.net/2025/Aug/9/

https://news.ycombinator.com/item?id=45840088

https://news.ycombinator.com/item?id=45891968