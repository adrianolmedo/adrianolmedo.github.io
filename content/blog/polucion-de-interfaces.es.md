---
title: "Polución de interfaces"
robots: "index,follow"
description: ""
image: "images/post/03.jpg"
date: 2021-07-15T16:56:47+06:00
draft: false
author: "Adrian Olmedo"
tags: ["translated", "advices", "oop"]
categories: ["Golang"]
---

{{< notice "note" >}}
 Below is a full Spanish translation of an William Kennedy\'s post in Ardan labs Blog: [Avoid Interface Pollution](https://www.ardanlabs.com/blog/2016/10/avoid-interface-pollution.html).
{{< /notice >}}

---

#### Introducción

Las interfaces solo deben utilizarse cuando su valor añadido sea claro. Veo demasiados paquetes que declaran interfaces innecesariamente, a veces solo por usar interfaces. El uso de interfaces cuando no son necesarias se denomina contaminación de interfaces. Esta es una práctica que me gustaría ver cuestionada e identificada más en las revisiones de código.

#### Código de Ejemplo

Veamos un ejemplo de código que contiene decisiones de diseño cuestionables que generan señales de Interface Pollution.

```go
01 package tcp
02
03 // Server defines a contract for tcp servers.
04 type Server interface {
05     Start() error
06     Stop() error
07     Wait() error
08 }
09
10 // server is our Server implementation.
11 type server struct {
12     /* impl */
13 }
14
15 // NewServer returns an interface value of type Server
16 // with an xServer implementation.
17 func NewServer(host string) Server {
18     return &server{host}
19 }
20
21 // Start allows the server to begin to accept requests.
22 func (s *server) Start() error {
23     /* impl */
24 }
25
26 // Stop shuts the server down.
27 func (s *server) Stop() error {
28     /* impl */
29 }
30
31 // Wait prevents the server from accepting new connections.
32 func (s *server) Wait() error {
33     /* impl */
34 }
```

Aquí está la lista de olores de Pollution Interface del código anterior:

1. El paquete declara una interfaz que coincide con toda la API de su propio tipo concreto.
2. La función factory devuelve el valor de la interfaz con el valor del tipo de estructura no exportada dentro.
3. La interfaz se puede eliminar y nada cambia para el usuario de la API.
4. La interfaz no desacopla la API del cambio.

Analicemos el código:

En la línea **04** vemos una declaración de interfaz exportada `Server`. Esta interfaz declara una duplicación exacta de la API declarada por `server` de tipo concreto no exportado en la línea **11**. Estas dos líneas de código marcan la casilla de los elementos **1 en la lista de olores**.

Luego, en la línea **17** vemos la función factory `NewServer`. Esta función crea un valor de `server` de tipo concreto no exportado y lo devuelve al usuario dentro de un valor de interfaz exportado de tipo `Server`. Esto marca la casilla del elemento **2 en la lista de olores**.

La siguiente lista de códigos muestra cómo la eliminación de la interfaz no cambia nada para el usuario:

```go
10 // Remove the interface and change the concrete type to be exported.
11 type Server struct {
12     /* impl */
13 }
14
15 // Have the NewServer function return a pointer of the concrete type instead
16 // of the interface type.
17 func NewServer(host string) *Server {
18     return &Server{host}
19 }
```

Hacer que el usuario trabaje directamente con el tipo concreto no cambia nada para el usuario ni para la API. Este cambio realmente ha mejorado las cosas porque se ha eliminado el nivel adicional de direccionamiento indirecto para llamar a los métodos a través del valor de la interfaz. Esto marca la casilla del elemento **3 en la lista de olores**.

Finalmente, si preguntamos qué puede cambiar en el código, nunca habrá una nueva implementación de `Server`. Tener una interfaz para desacoplar el tipo de estructura `server` de la API no ayuda a la API a desacoplarse del cambio. Esto marca la casilla final para el elemento **4 en la lista de olores**.

#### Conclusión

Aquí hay algunas pautas que puede seguir para validar y cuestionar el uso de interfaces en su código:

Use una interfaz:

- Cuando los usuarios de la API necesitan proporcionar un *detalle de implementación* (?).
- Cuando las API tienen varias implementaciones, necesitan mantenerla internamente.
- Cuando se han identificado partes de la API que pueden cambiar y requieren desacoplamiento.

---

**References**

K. William. (Oct 21, 2016). Avoid Interface Pollution. https://www.ardanlabs.com/blog/2016/10/avoid-interface-pollution.html
