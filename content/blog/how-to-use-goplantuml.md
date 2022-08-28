---
translationKey: how-to-use-goplantuml
title: "How to use GoPlantUML?"
robots: "index,follow"
description: "A tool to automatically plot a UML graph of Go structures analogous to classes."
image: "images/post/06.jpg"
date: 2021-07-23T11:35:57+06:00
author: "Adrian Olmedo"
tags: ["uml", "oop"]
categories: ["Golang"]
draft: false
---

`goplantuml` generates code in PlantUML format that represents a diagram of the relationships between the Go receiver structs, they are analogous to classes in traditional OOP.

A useful tool at the beginning of the design and planning a complex project in Go, if you want graphically observe which entities are stepping on interfaces, visually follow dependency injections or identify patterns.

#### If your project is flat without packages

```bash
$ goplantuml -aggregate-private-members -show-compositions -show-implementations -show-aggregations . > diagram.puml
```

#### If your project has packages

```bash
$ goplantuml -aggregate-private-members -show-compositions -show-implementations -show-aggregations ./ > diagram.puml
```
