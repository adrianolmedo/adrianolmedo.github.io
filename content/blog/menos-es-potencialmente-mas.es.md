---
title: "Menos es potencialmente más"
robots: "index,follow"
description: "Aquí está el texto de la charla que di en la reunión de Go SF en junio de 2012. Esta es una charla personal. No hablo por nadie más en el equipo de Go aquí, aunque quiero reconocer desde el principio que el equipo es lo que hizo y sigue haciendo que Go suceda."
image: "images/post/05.jpg"
date: 2021-07-15T12:09:51+06:00
draft: false
author: "Adrian Olmedo"
tags: ["translated", "advices", "oop"]
categories: ["Golang"]
---

{{< notice "note" >}}
 Below is a full Spanish translation of Rob Pike\'s original post on his personal Blogger: [Less is exponentially more](https://commandcenter.blogspot.com/2012/06/less-is-exponentially-more.html).
{{< /notice >}}

---

Aquí está el texto de la charla que di en la reunión de Go SF en junio de 2012.

Esta es una charla personal. No hablo por nadie más en el equipo de Go aquí, aunque quiero reconocer desde el principio que el equipo es lo que hizo y sigue haciendo que Go suceda. También me gustaría agradecer a los organizadores de Go SF por darme la oportunidad de hablar con ustedes.

Hace unas semanas me preguntaron: "¿Cuál fue la mayor sorpresa que encontraste al implementar Go?" Supe la respuesta al instante: aunque esperábamos que los programadores de C++ vieran Go como una alternativa, en cambio, la mayoría de los programadores de Go provienen de lenguajes como Python y Ruby. Muy pocos proceden de C++.

Nosotros, —Ken, Robert y yo—, éramos programadores de C++ cuando diseñamos un nuevo lenguaje para resolver los problemas que creíamos que debían resolverse para el tipo de software que escribimos. Parece casi paradójico que a otros programadores de C++ no les importe.

Me gustaría hablar hoy sobre lo que nos impulsó a crear Go y por qué el resultado no debería habernos sorprendido así. Prometo que esto será más sobre Go que sobre C++, y que si no conoces C++ podrás seguirlo.

La respuesta se puede resumir así: ¿Crees que menos es más o menos es menos?

Aquí hay una metáfora, en forma de historia real. A Bell Labs centers le asignaron originalmente números de tres letras: 111 para Investigación en Física, 127 para Investigación en Ciencias de la Computación, y así sucesivamente. A principios de la década de 1980, apareció un memorando anunciando que a medida que nuestra comprensión de la investigación había aumentado, se había hecho necesario agregar otro dígito para poder caracterizar mejor nuestro trabajo. Así que nuestro centro se convirtió en 1127. Ron Hardin bromeó, medio en serio, que si realmente entendiéramos nuestro mundo mejor, podríamos bajar un dígito y pasar de 127 a solo 27. Por supuesto, la gerencia no entendió la broma, ni tampoco la esperaba, pero creo que hay sabiduría en ello. Menos puede ser más. Cuanto mejor entiendas, más conciso podrás ser.

Tenga esa idea en mente.

Alrededor de septiembre de 2007, estaba haciendo un trabajo menor pero central en un enorme programa de Google C++, uno con el que todos habéis interactuado, y mis compilaciones tardaban unos 45 minutos en nuestro enorme grupo de compilación distribuido. Se anunció que iba a haber una charla presentada por un par de empleados de Google que forman parte del comité de estándares de C++. Nos iban a decir lo que vendría en C++ 0x, como se llamaba en ese momento. (Ahora se conoce como C++ 11).

En el lapso de una hora en esa charla, escuchamos acerca de unas 35 funciones nuevas que se estaban planificando. De hecho hubo muchos más, pero solo 35 fueron descritos en la charla. Algunas de las características eran menores, por supuesto, pero las de la charla eran al menos lo suficientemente significativas como para llamar la atención. Algunas eran muy sutiles y difíciles de entender, como las referencias de `rvalue`, mientras que otras son especialmente similares a C++, como las *variadic templates*, y otras son simplemente locas, como literales definidos por el usuario.

En este punto me hice una pregunta: ¿El comité de C++ realmente creía que lo malo de C++ era que no tenía suficientes funciones? Seguramente, en una variante del chiste de Ron Hardin, sería un mayor logro simplificar el lenguaje en lugar de agregarle más. Por supuesto, eso es ridículo, pero tenga en cuenta la idea.

Solo unos meses antes de esa charla de C++, yo mismo había dado una charla, que puedes ver en YouTube, sobre un lenguaje concurrente de juguete que había construido en la década de 1980. Ese lenguaje se llamó Newsqueak y por supuesto es un precursor de Go.

Di esa charla porque había ideas en Newsqueak que extrañaba en mi trabajo en Google y había estado pensando en ellas nuevamente. Estaba convencido de que facilitarían la escritura del código del servidor y Google realmente podría beneficiarse de eso.

De hecho, intenté y no pude encontrar una manera de llevar las ideas a C++. Era demasiado difícil acoplar las operaciones concurrentes con las estructuras de control de C++ y, a su vez, eso dificultaba ver las ventajas reales. Además, C++ hizo que todo pareciera demasiado engorroso, aunque admito que nunca fui realmente fácil en el lenguaje. Entonces abandoné la idea.

Pero la charla de C++ 0x me hizo pensar de nuevo. Una cosa que realmente me molestó, y creo que Ken y Robert también, fue el nuevo modelo de memoria C++ con tipos atómicos. Simplemente se sentía mal poner un conjunto de detalles tan definidos microscópicamente en un sistema de tipos que ya estaba sobrecargado. También parecía miope, ya que es probable que el hardware cambie significativamente en la próxima década y no sería prudente acoplar demasiado el lenguaje al hardware actual.

Regresamos a nuestras oficinas después de la charla. Comencé otra compilación, giré mi silla para mirar a Robert y comencé a hacer preguntas directas. Antes de que terminara la compilación, atamos a Ken y decidimos hacer algo. No queríamos escribir en C++ para siempre, y nosotros, —especialmente yo—, queríamos tener la simultaneidad al alcance de mi mano al escribir código de Google. También queríamos abordar el problema de la "programación en grande" de frente, del que hablaremos más adelante.

Escribimos en la pizarra un montón de cosas que queríamos, desiderata si se quiere. Pensamos en grande, ignorando la sintaxis y la semántica detalladas y centrándonos en el panorama general.

Todavía tengo un hilo de correo fascinante de esa semana. Aquí hay un par de extractos:

Robert: 

> Punto de partida: C, corregir algunos defectos obvios, eliminar la suciedad, agregar algunas características que faltan.

Rob: 

> nombre: 'go'. puedes inventar razones para este nombre, pero tiene buenas propiedades. es breve y fácil de escribir. tools: goc, gol, goa. si hay un depurador / intérprete interactivo, podría simplemente llamarse 'go'. el sufijo es .go.

Robert:

> Interfaces vacías: interface{}. Estos son implementados por todas las interfaces y, por lo tanto, esto podría reemplazar a void*.

No lo resolvimos todo de inmediato. Por ejemplo, nos llevó más de un año descubrir arrays y slices. Pero una gran parte del sabor del lenguaje surgió en esos primeros días.

Observe que Robert dijo que C era el punto de partida, no C++. No estoy seguro, pero creo que se refería a C propiamente dicho, especialmente porque Ken estaba allí. Pero también es cierto que, al final, en realidad no partimos de C. Creamos desde cero, tomando prestadas solo cosas menores como operadores y corchetes y algunas palabras clave comunes. (Y, por supuesto, también tomamos prestadas ideas de otros lenguajes que conocíamos). En cualquier caso, ahora veo que reaccionamos a C++ volviendo a lo básico, descomponiéndolo todo y comenzando de nuevo. No estábamos tratando de diseñar un C++ mejor, ni siquiera un C mejor. Se trataba de un lenguaje mejor en general para el tipo de software que nos importaba.

Al final, por supuesto, resultó bastante diferente de C o C++. Más diferente incluso de lo que muchos creen. Hice una lista de simplificaciones significativas en Go sobre C y C++:

|  |
|--|
|- sintaxis regular (no se necesita una tabla de símbolos para analizar)|
|- recolección de basura (solo)|
|- sin archivos de encabezado|
|- dependencias explícitas|
|- sin dependencias circulares|
|- las constantes son solo números|
|- int e int32 son tipos distintos|
|- case letters establece visibilidad|
|- métodos para cualquier tipo (sin clases)|
|- sin herencia de subtipos (sin subclases)|
|- init a nivel de paquete y orden de init bien definido|
|- archivos compilados juntos en un paquete|
|- globales a nivel de paquete presentados en cualquier orden|
|- sin conversiones aritméticas (las constantes ayudan)|
|- las interfaces son implícitas (sin declaración de "implements")|
|- incrustación (sin promoción a superclase)|
|- los métodos se declaran como funciones (sin ubicación especial)|
|- los métodos son solo funciones|
|- las interfaces son solo métodos (sin datos)|
|- los métodos coinciden solo por nombre (no por tipo)|
|- sin constructores ni destructores|
|- el poscremento y el posdecremento son declaraciones, no expresiones|
|- sin preincremento o predecremento|
|- la asignación no es una expresión|
|- orden de evaluación definido en la asignación, llamada de función (sin "punto de secuencia")|
|- sin aritmética de puntero|
|- la memoria siempre está a cero|
|- legal para tomar la dirección de la variable local|
|- no "this" en los métodos|
|- pilas segmentadas|
|- sin const u otro tipo de anotaciones|
|- sin plantillas|
|- sin excepciones
|- builtin string, slice, map|
|- comprobación de límites en arrays|

Y, sin embargo, con esa larga lista de simplificaciones y piezas faltantes, Go es, creo, más expresivo que C o C++. Menos puede ser más.

Pero no puedes sacarlo todo. Necesita componentes básicos como una idea sobre cómo se comportan los tipos, una sintaxis que funcione bien en la práctica y algo inefable que haga que las bibliotecas interoperen bien.

Una cosa que está notoriamente ausente es, por supuesto, una jerarquía de tipos. Permítame ser grosero con eso por un minuto.

Al principio del lanzamiento de Go, alguien me dijo que no podía imaginarse trabajando en un idioma sin tipos genéricos. Como he informado en otra parte, me pareció un comentario extraño.

Para ser justos, probablemente estaba diciendo a su manera que realmente le gustaba lo que STL hace por él en C++. Sin embargo, para el propósito de la discusión, consideremos su afirmación al pie de la letra.

Lo que dice es que para él escribir contenedores como listas de entradas y mapas de cadenas es una carga insoportable. Encuentro que es una afirmación extraña. Paso muy poco de mi tiempo de programación luchando con esos problemas, incluso en lenguajes sin tipos genéricos.

Pero lo que es más importante, lo que dice es que los tipos son la forma de aliviar esa carga. Tipos. No funciones polimórficas o primitivas del lenguaje o ayudantes de otro tipo, sino tipos.

Ese es el detalle que me queda grabado.

Los programadores que vienen a Go desde C++ y Java pierden la idea de programar con tipos, particularmente herencia y subclases y todo eso. Quizás soy un filisteo con los tipos, pero nunca he encontrado ese modelo particularmente expresivo.

Mi difunto amigo Alain Fournier me dijo una vez que consideraba que la taxonomía es la forma más baja de trabajo académico. ¿Y sabes qué? Las jerarquías de tipos son solo taxonomía. Debe decidir qué pieza va en qué caja, el padre de cada tipo, si A hereda de B o B de A. ¿Es una matriz ordenable una matriz que ordena o un clasificador representado por una matriz? Si cree que los tipos abordan todos los problemas de diseño, debe tomar esa decisión.

Creo que es una forma absurda de pensar en la programación. Lo que importa no son las relaciones ancestrales entre las cosas, sino lo que pueden hacer por ti.

Eso, por supuesto, es donde entran las interfaces en Go. Pero son parte de un panorama más amplio, la verdadera filosofía de Go.

Si C++ y Java se tratan de jerarquías de tipos y la taxonomía de tipos, Go se trata de composición.

Doug McIlroy, el eventual inventor de las Unix pipes, escribió en 1964 (!):

> Deberíamos tener algunas formas de acoplar programas como la manguera de jardín: atornille en otro segmento cuando sea necesario masajear los datos de otra manera. Esta es también la forma de IO.

Ese es el camino de Go también. Go toma esa idea y la lleva muy lejos. Es un lenguaje de composición y acoplamiento.

El ejemplo obvio es la forma en que las interfaces nos dan la composición de los componentes. No importa qué es esa cosa, si implementa el método M, puedo dejarlo aquí.

Otro ejemplo importante es cómo la concurrencia nos da la composición de cálculos que se ejecutan de forma independiente.

E incluso hay una forma inusual (y muy simple) de composición tipográfica: incrustación.

Estas técnicas de composición son las que le dan a Go su sabor, que es profundamente diferente del sabor de los programas C++ o Java.

---

Hay un aspecto no relacionado del diseño de Go que me gustaría mencionar: Go fue diseñado para ayudar a escribir grandes programas, escritos y mantenidos por grandes equipos.

Existe esta idea sobre "programar en grande" y de alguna manera C++ y Java poseen ese dominio. Creo que es solo un accidente histórico, o quizás un accidente industrial. Pero la creencia generalizada es que tiene algo que ver con el diseño orientado a objetos.

No me lo creo en absoluto. El gran software necesita metodología para estar seguro, pero no tanto como necesita una sólida gestión de dependencias y una abstracción de interfaz limpia y excelentes herramientas de documentación, ninguna de las cuales funciona bien con C++ (aunque Java lo hace notablemente mejor).

No lo sabemos todavía, porque no se ha escrito suficiente software en Go, pero estoy seguro de que Go resultará ser un excelente lenguaje para la programación en general. El tiempo dirá.

---

Ahora, para volver a la sorprendente pregunta que abrió mi charla:

¿Por qué Go, un lenguaje diseñado desde cero para lo que se usa C++, no atrae a más programadores de C++?

Bromas aparte, creo que es porque Go y C++ son filosóficamente profundamente diferentes.

C++ consiste en tenerlo todo al alcance de la mano. Encontré esta cita en una pregunta frecuente de C++ 11:

> La gama de abstracciones que C++ puede expresar de forma elegante, flexible y sin costes en comparación con el código especializado elaborado a mano ha aumentado considerablemente.

Esa forma de pensar no es la forma en que funciona Go. El costo cero no es un objetivo, al menos no el costo de CPU cero. La afirmación de Go es que minimizar el esfuerzo del programador es una consideración más importante.

Go no lo abarca todo. No tiene todo integrado. No tiene un control preciso de cada matiz de ejecución. Por ejemplo, no tienes RAII. En su lugar, obtienes un recolector de basura. Ni siquiera obtienes una función para liberar memoria.

Lo que se le proporciona es un conjunto de bloques de construcción poderosos pero fáciles de entender y de usar a partir de los cuales puede ensamblar, componer, una solución a su problema. Puede que no termine tan rápido o tan sofisticado o tan ideológicamente motivado como la solución que escribiría en algunos de esos otros idiomas, pero es casi seguro que será más fácil de escribir, más fácil de leer, más fácil de entender, más fácil de escribir. mantener, y tal vez más seguro.

Para decirlo de otra manera, simplificando demasiado, por supuesto:

Los programadores de Python y Ruby vienen a Go porque no tienen que renunciar a mucha expresividad, sino que obtienen rendimiento y se ponen a jugar con la concurrencia.

Los programadores de C++ no vienen a Go porque hayan luchado duro para obtener un control exquisito de su dominio de programación y no quieren ceder nada de eso. Para ellos, el software no se trata solo de hacer el trabajo, se trata de hacerlo de cierta manera.

El problema, entonces, es que el éxito de Go contradeciría su visión del mundo.

Y deberíamos habernos dado cuenta de eso desde el principio. A las personas que están entusiasmadas con las nuevas características de C++ 11 no les va a importar un lenguaje que tenga mucho menos. Incluso si, al final, ofrece mucho más.

Gracias.

---

**References**

P. Rob. (Jun 25, 2012). Less is exponentially more. *command center*. https://commandcenter.blogspot.com/2012/06/less-is-exponentially-more.html
