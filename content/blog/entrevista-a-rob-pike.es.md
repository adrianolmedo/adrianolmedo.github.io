---
title: "Go se ha convertido en el lenguaje de la infraestructura en la nube"
robots: "index,follow"
description: "Hablamos con Rob Pike, coautor del lenguaje de programación Go, sobre una carrera que abarca cuatro décadas, la evolución de Go en los últimos diez años y en el futuro."
image: "images/post/04.jpg"
date: 2021-08-20T16:56:47+06:00
draft: true
author: "Adrian Olmedo"
tags: ["translated", "interview", "cloud"]
categories: ["Golang"]
---

{{< notice "note" >}}
 Below is a full Spanish translation of an interview with Rob Pike by Evrone: [Rob Pike interview: Go has indeed become the language of cloud infrastructure](https://evrone.com/rob-pike-interview).
{{< /notice >}}

---

#### Introducción

Hablamos con Rob Pike, coautor del lenguaje de programación Go, sobre una carrera que abarca cuatro décadas, la evolución de Go en los últimos diez años y en el futuro.

#### La Entrevista

— Evrone:

> A diferencia de muchos desarrolladores de hoy, usted comenzó su carrera hace décadas en Bell Labs. ¿Cuál ha sido el mayor cambio en la forma en que desarrollamos software que se le ocurra, dada su perspectiva poco común?

— Rob:

> La escala es mucho mayor hoy. No solo de las computadoras y la red, sino de los programas mismos. Toda la versión 6 de Unix (alrededor de 1975) cabe cómodamente en un solo paquete de disco RK05, que tiene poco más de 2 MB de almacenamiento, y queda mucho espacio para el software del usuario. Y ese era un buen entorno informático, o al menos parecía uno en ese momento. Aunque, por supuesto, puedo explicar gran parte del crecimiento, es asombroso y quizás no todo esté justificado.

— Evrone:

> Dadas las ideas de "resistencia al cambio" y "promesa de compatibilidad", ¿cómo ve los próximos 10 años para el lenguaje de programación Go y su ecosistema? ¿Cuál es el mejor futuro que imagina para su tecnología?

— Rob:

> Aunque está lejos de ser seguro, después de más de una década de trabajo parece un diseño para el polimorfismo paramétrico, lo que coloquialmente pero engañosamente se llama genéricos, llegará en el próximo año o dos. Fue un problema muy difícil encontrar un diseño que funcione dentro del lenguaje existente y se sienta como si perteneciera, pero Ian Taylor invirtió una cantidad fenomenal de energía en el problema y parece que la respuesta ahora está al alcance.<br><br>Será fascinante observar cómo eso afecta a las bibliotecas, el ecosistema y la comunidad.

— Evrone:

> Con la introducción del "tipado gradual" en los lenguajes "dinámicamente tipados" y la "inferencia de tipos" en los de "tipado estático", la línea entre los dos ahora se difumina. ¿Cuál es su opinión sobre un sistema de tipos para un lenguaje de programación moderno?

— Rob:

> Soy un gran fanático del tipado estático debido a la estabilidad y seguridad que brinda.<br><br>Soy un gran admirador del tipado dinámico debido a la sensación liviana y divertida que aporta. (Como nota al margen, el gran impulso para las pruebas unitarias integradas se puede atribuir a lenguajes como Python, que impulsó el testing para demostrar la corrección que el sistema de tipos no pudo proporcionar).<br><br>No soy un fanático de la programación basada en tipos, las jerarquías y clases de tipos y la herencia. Aunque muchos proyectos de gran éxito se han construido de esa manera, creo que el enfoque impulsa decisiones importantes demasiado pronto en la fase de diseño, antes de que la experiencia pueda influir en ellas. En otras palabras, prefiero la composición a la herencia.<br><br>Sin embargo, les digo a aquellos que se sienten cómodos usando la herencia para estructurar sus programas: no presten atención y continúen usando lo que les funcione.

— Evrone:

> A veces, la gente usa las tecnologías de formas extrañas. Por ejemplo, para generar código Go eficiente a partir del código Python o Ruby de alto nivel (sí, ¡lo vimos pasar!) A lo largo de los años, ¿cuál es el uso de Go más extraño, creativo o divertido que ha visto? ¿Qué te sorprendió más?

— Rob:

> La mayor sorpresa fue cuando nos enteramos de que Go se estaba utilizando para escribir malware. No puedes controlar quién usará tu trabajo o qué harán con él.

— Evrone:

> Creaste varios editores de texto. ¿Qué opinas del código de Visual Studio? Con tecnologías como LSP, la línea entre "editor de texto" e IDE ahora se difumina. ¿Crees que los desarrolladores de software necesitan IDE con todas las funciones como GoLand o usar VSCode está bien?

— Rob:

> Soy de una época diferente, antes de los IDE, pero se habló al principio del proyecto sobre si Go necesitaba un IDE para tener éxito. Sin embargo, nadie en el equipo tenía las habilidades adecuadas, por lo que no intentamos crear una. Sin embargo, creamos bibliotecas centrales para analizar e imprimir código Go, lo que pronto permitió plugins de alta calidad para todo tipo de editor e IDE, y eso fue un éxito fortuito.<br><br>Más recientemente, hemos estado trabajando duro en un servidor LSP para Go llamado gopls, que puede ser utilizado por cualquier editor o IDE que admita ese protocolo para mejorar la experiencia de trabajar con el lenguaje.<br><br>Quizás debido a nuestra comodidad al trabajar con estilos de editor más simples, nos aseguramos de que uno pudiera trabajar cómodamente en Go sin tener que soportar mucho esfuerzo en el entorno de programación. Sin embargo, un IDE ciertamente puede ayudar: la mayoría de los que veo trabajando en Go hoy usan uno, o al menos un editor con soporte personalizado de Go, y obtienen mucho valor de él.<br><br>La cuestión de qué estilo de editor utilizar es una cuestión de gustos, matizada por la cultura del idioma en el que trabaja.

— Evrone:

> Los desarrolladores de software tienden a etiquetar cosas, como que Dart es un "lenguaje de interfaz" y C es un "lenguaje de bajo nivel del sistema", y así sucesivamente. ¿Cómo llamaría ahora el lenguaje de programación Go, dado su conjunto de funciones y uso?

— Rob:

> Go es un lenguaje de programación de uso general. Escriba lo que quiera en él y no se preocupe por anclar el idioma, o cualquier otra tecnología, a un solo dominio de problemas.

— Evrone:

> ¿Qué otros lenguajes de programación modernos te gustan personalmente?

— Rob:

> La experiencia de Go me ha enseñado que a la gente le encanta opinar sobre los lenguajes, quizás más que casi cualquier otro elemento de nuestro campo. Y ciertamente lo he hecho yo mismo. Pero estoy cansado de la negatividad que a menudo resulta, así que ahora trato de evitar juzgar las cosas por los demás.<br><br>Ha habido un verdadero renacimiento en el diseño de lenguajes durante los últimos 10 años, después de un período en el que muy pocos lenguajes nuevos llegaban y tenían éxito. Es genial ver esto y la innovación que trae.

— Evrone:

> ¿Cómo le ayuda ser empleado de Google a desarrollar y guiar Golang? ¿Qué importancia tiene poder preguntar "¿cuéntanos cómo usas nuestro lenguaje?" en Twitter y obtener respuestas de las empresas más grandes del mundo? ¿Es solo una buena adición o una parte esencial del desarrollo del lenguaje? ¿Cómo te ayuda Google?

— Rob:

> Google ha sido muy generoso en su apoyo al proyecto Go, por lo que estoy muy agradecido. Y, por supuesto, el lenguaje se creó porque pensamos que Google lo necesitaba; lo que se denominó "computación en la nube" necesitaba un lenguaje con buen soporte para la concurrencia y su fácil implementación, entre otras cosas. Pero Google no ha dirigido el proyecto de manera significativa. Nos apoya y nos permite hacer lo que creemos que es mejor.<br><br>Con respecto a otras empresas y otros usuarios, los aportes de la comunidad son una parte vital para entender cómo avanza el proyecto, con lo que me refiero al lenguaje, el compilador, las herramientas, el runtime, bibliotecas, entorno, todo eso.

— Evrone:

> Después de 10 años de desarrollo de Go y de observar cómo se usa, ¿puedes nombrar el mayor éxito de diseño y, al contrario, el mayor fracaso de diseño para el lenguaje? ¿Son puntos más fuertes y más débiles, respectivamente?

— Rob:

> Me gustaría mencionar dos cosas, una técnica y otra política.<br><br>La parte técnica es un soporte de primera clase para el cálculo concurrente. Go tiene solo una década más o menos, pero cuando se estaba desarrollando, el "threading" y la concurrencia no eran muy apreciados en la comunidad de programación. De hecho, una de las principales razones para crear Go fue la dificultad de realizar cálculos concurrentes en C++ en ese momento. Poco después del lanzamiento, quedó claro que el soporte de concurrencia era una atracción importante, que compensaba lo que algunos sentían que eran debilidades en otras partes del lenguaje. La concurrencia tocó un nervio. Y una vez que la gente jugó con la concurrencia, comenzaron a explorar otras cosas sobre el lenguaje y aprendieron que había más de lo que originalmente pensaban. El soporte para la concurrencia fue la puerta de entrada.<br><br>Como dice John Graham-Cumming de Cloudflare, "Vine por la concurrencia fácil, me quedé por la composición fácil".<br><br>Go cambió la conversación sobre cómo programar computadoras multinúcleo.<br><br>El éxito político fue la firme promesa hecha sobre la compatibilidad para la versión 1 de Go. Una vez que nosotros y la comunidad usamos Go durante algunos años, teníamos una larga lista de cosas que queríamos arreglar, pero el cambio es perturbador. Así que hicimos un cuidadoso programa de actualizaciones, con el comando "go fix" para hacer avanzar a la comunidad, y una vez hecho esto, no solo nos detuvimos, sino que prometimos quedarnos detenidos. Esa estabilidad (programas Go escritos en 2012 todavía se compilarán y ejecutarán perfectamente hoy) fue un gran facilitador para el crecimiento. Las empresas podrían utilizar el lenguaje con la confianza de que no romperíamos su software. La tasa de adopción aumentó drásticamente después de la versión 1 y apareció la promesa de compatibilidad. Y aunque desde entonces hemos aprendido de muchas otras cosas que nos gustaría cambiar, no podemos romper los programas existentes, y estamos de acuerdo con eso.

— Evrone:

> ¿Cómo se ve su equilibrio entre el trabajo y la vida personal? Se habla mucho de "agotamiento" en este momento, y la situación epidémica no ayuda en absoluto. ¿Algún indicio de su viaje de 40 años para las nuevas generaciones de desarrolladores?

— Rob:

> La mejor manera de evitar el agotamiento es hacer algo que realmente disfrute en un entorno que lo apoye. He tenido mucha suerte en ese sentido durante toda mi carrera, pero me doy cuenta de que no todos son tan afortunados. Si se siente estresado por el trabajo, debe sentirse libre de tomar un descanso o cambiar de dirección, especialmente en nuestra situación actual.

— Evrone:

> En retrospectiva, la popularidad de muchas tecnologías se atribuye a las llamadas "aplicaciones asesinas" (*killer apps*) que las hicieron populares. ¿Puedes nombrar alguna "aplicación(es) asesina" para Golang y qué opinas sobre la idea de una "aplicación asesina" en su conjunto?

— Rob:

> Hace unos años, Danny Berkholz llamó a Go "el lenguaje emergente de la infraestructura en la nube", y eso no es casualidad. Go fue diseñado por personas que trabajan en Google para facilitar la escritura de software relevante para Google, en particular servidores residentes en la red. Eso es lo que hoy llamamos "nube". (Parte de la motivación para el diseño está en mi discurso de presentación de Splash de 2012, Go at Google: Language Design in the Service of Software Engineering).<br><br>Entonces, aunque fue gratificante e importante ver a Docker, Kubernetes y muchos otros componentes de  la computación en la nube escritos en Go, quizás no sea demasiado sorprendente. De hecho, Go se ha convertido en el lenguaje de la infraestructura en la nube.

— Evrone:

> ¿Qué competencia ve para Golang en este momento y en qué área? ¿Cuál es su opinión sobre Rust con sus ideas de "no-garbage-collection" y garantías en tiempo de compilación?

— Rob:

> Rust es un lenguaje intrigante y observo su desarrollo con interés. Más allá de eso, no ofrezco ninguna opinión, como dije anteriormente.

— Evrone:

> ¡Go acaba de alcanzar 70.000 stars en GitHub! ¿Cómo ve las diferentes actividades sociales como GitHub, Reddit, Twitter, conferencias off-line y on-line, webinars, etc., que influyen en el lenguaje? ¿Son importantes para el éxito del lenguaje o simplemente lo reflejan?

— Rob:

> Las personas que hemos conocido a través de conferencias y redes sociales han sido una parte fundamental del desarrollo de Go y todos sus elementos. Muchos, muchos contribuyentes han afectado el desarrollo de manera positiva, incluido el puerto original a Windows y una serie de arquitecturas que no son x86, el desarrollo de herramientas y bibliotecas, discusiones reflexivas sobre propuestas técnicas y mucho más.<br><br>Y va al revés, ya que el equipo de Go se acerca a la comunidad para iniciar debates, plantear preguntas y pedir ayuda y orientación.<br><br>Una cosa que creo que es importante es comprometerse con la comunidad como una sola voz, hablar como un equipo en lugar de como individuos. Un mensaje coherente se comprende más fácilmente.

— Evrone:

> ¿Cómo ha cambiado tu vida el ser el autor de uno de los lenguajes de programación más populares?

— Rob:

> Una corrección: soy coautor, no autor. Ken Thompson y Robert Griesemer comenzaron el proyecto conmigo, y muchos otros contribuyeron enormemente. Así que, por favor, no me señalen como "el autor".<br><br>Para responder a su pregunta, Go ciertamente ha elevado mi perfil público y me ha presentado a una comunidad nueva y vibrante, pero más allá de eso no ha tenido mucho efecto. He tenido una larga carrera con otros éxitos (e innumerables fracasos).

— Evrone:

> Imagina que tienes la oportunidad de viajar atrás en el tiempo y dar solo un consejo a tu yo más joven, aproximadamente en el momento en que comenzaste a diseñar la especificación del lenguaje Go. ¿Qué consejo le darías a tí mismo y a sus compañeros?

— Rob:

> Eso es fácil: ignora a los haters. Simplemente escuche las voces que comprenden y comparten tus objetivos; son a esas personas en las que deberías preocuparte. No todo el mundo está de acuerdo con lo que estás haciendo, y eso está bien. Pero aquellos que se involucran en hacer avanzar lo que está tratando de hacer pueden ser una fuente fantástica de ideas, energía e inspiración.<br><br>Siempre estaremos agradecidos con nuestra apasionada comunidad.
