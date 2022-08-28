---
translationKey: download-videos-from-youtube-with-youtube-dl
title: "Descargar vídeos de YouTube con youtube-dl"
robots: "index,follow"
description: "youtube-dl es una herramienta de línea de comandos que nos permite descargar vídeos de varias fuentes desde la terminal."
image: "images/post/07.jpg"
date: 2021-02-17T18:19:25+06:00
author: "Adrian Olmedo"
tags: ["youtube", "youtube-dl"]
categories: ["Tutorials"]
draft: false
---

`youtube-dl` es una herramienta de cmd que nos permite descargar vídeos de varias fuentes (no sólo de YouTube) desde la interfaz de terminal. Este tutorial lo hice con la version `2020.06.16.1`, si quieres saber qué versión estás corriendo usa `--version`:

```bash
$ youtube-dl --version
2020.06.16.1
```

Antes de empezar a descargar un vídeo debes asegurarte en qué formato, 
calidad y peso lo quires, con el comando `youtube-dl --list-formats` seguido de la URL del vídeo:

```bash
$ youtube-dl --list-formats https://www.youtube.com/watch?v=SwpkPf63304
249          webm       audio only tiny   66k , opus @ 50k (48000Hz), 31.06MiB
250          webm       audio only tiny   89k , opus @ 70k (48000Hz), 41.10MiB
140          m4a        audio only tiny  135k , m4a_dash container, mp4a.40.2@128k (44100Hz), 83.58MiB
251          webm       audio only tiny  179k , opus @160k (48000Hz), 83.12MiB
394          mp4        256x144    144p   99k , av01.0.00M.08, 25fps, video only, 50.33MiB
278          webm       256x144    144p  127k , webm container, vp9, 25fps, video only, 58.19MiB
160          mp4        256x144    144p  155k , avc1.4d400c, 25fps, video only, 63.09MiB
242          webm       426x240    240p  226k , vp9, 25fps, video only, 127.02MiB
395          mp4        426x240    240p  237k , av01.0.00M.08, 25fps, video only, 111.59MiB
243          webm       640x360    360p  432k , vp9, 25fps, video only, 230.93MiB
133          mp4        426x240    240p  456k , avc1.4d4015, 25fps, video only, 147.51MiB
396          mp4        640x360    360p  483k , av01.0.01M.08, 25fps, video only, 206.01MiB
244          webm       854x480    480p  771k , vp9, 25fps, video only, 391.84MiB
397          mp4        854x480    480p  821k , av01.0.04M.08, 25fps, video only, 365.63MiB
134          mp4        640x360    360p  995k , avc1.4d401e, 25fps, video only, 288.22MiB
398          mp4        1280x720   720p 1529k , av01.0.05M.08, 25fps, video only, 730.90MiB
247          webm       1280x720   720p 1539k , vp9, 25fps, video only, 733.20MiB
135          mp4        854x480    480p 1638k , avc1.4d401e, 25fps, video only, 423.79MiB
399          mp4        1920x1080  1080p 2658k , av01.0.08M.08, 25fps, video only, 1.26GiB
248          webm       1920x1080  1080p 2693k , vp9, 25fps, video only, 1.53GiB
136          mp4        1280x720   720p 3117k , avc1.4d401f, 25fps, video only, 734.95MiB
137          mp4        1920x1080  1080p 5577k , avc1.640028, 25fps, video only, 2.37GiB
18           mp4        640x360    360p  724k , avc1.42001E, 25fps, mp4a.40.2@ 96k (44100Hz), 467.68MiB (best)
```

En la primera columna aparece un número de referencia, ese será nuestra opción a elegir, por ejemplo el `18` que es el último de esa lista:

```bash
$ youtube-dl -f 18 https://www.youtube.com/watch?v=SwpkPf63304
```

#### Obtener sólo audio (mp3)

```bash
$ youtube-dl -x --audio-format mp3 https://www.youtube.com/watch?v=SwpkPf63304
```

---

**References**

[https://www.tecmint.com/download-mp3-song-from-youtube-videos/](https://www.tecmint.com/download-mp3-song-from-youtube-videos/)

[https://blog.desdelinux.net/youtube-dl-tips-que-no-sabias/](https://blog.desdelinux.net/youtube-dl-tips-que-no-sabias/)

[http://www.webupd8.org/2014/02/video-downloader-youtube-dl-gets.html](http://www.webupd8.org/2014/02/video-downloader-youtube-dl-gets.html)
