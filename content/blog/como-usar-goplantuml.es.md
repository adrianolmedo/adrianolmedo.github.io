---
translationKey: how-to-use-goplantuml
title: "¿Cómo usar GoPlantUML?"
robots: "index,follow"
description: "Una herramienta para trazar gráficamente y de manera automática un gráfico UML de las estructuras Go análogas a las clases."
image: "images/post/06.jpg"
date: 2021-07-23T11:35:57+06:00
author: "Adrian Olmedo"
tags: ["uml", "poo"]
categories: ["Golang"]
draft: false
---

`goplantuml` genera un código en formato PlantUML que representa un diagrama de las relaciones entre las estructuras receptoras de Go que son análogas a las clases en la OOP tradicional.

Una herramienta útil al comienzo del diseño y planificación de un proyecto complejo en Go si deseas de manera gráfica observar cúales entidades están pisando interfaces, seguir visualmente inyecciones de dependencia o identificar patrones.

#### Si tu proyecto es plano sin paquetes

```bash
$ goplantuml -aggregate-private-members -show-compositions -show-implementations -show-aggregations . > diagram.puml
```

#### Si tu proyecto tiene paquetes

```bash
$ goplantuml -aggregate-private-members -show-compositions -show-implementations -show-aggregations ./ > diagram.puml
```
