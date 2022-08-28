---
translationKey: record-video-screen-with-ffmpeg
title: "Grabar vídeo pantalla con FFmpeg"
robots: "index,follow"
description: "ffmpeg es una herramienta que no sólo permite funcionaliades como conversion de formato de archivos multimedia sino que también grabar vídeo pantalla partiendo desde la interfaz de terminal."
image: "images/post/02.jpg"
date: 2021-04-13T15:33:57+06:00
author: "Adrian Olmedo"
tags: ["ffmpeg"]
categories: ["Tutorials"]
draft: false
---

`ffmpeg` es una herramienta que además de permitir la conversion de formato de archivos multimedia también puedes grabar vídeo pantalla partiendo desde la interfaz de terminal.

Este tutorial lo hice con la version `n4.1.4`, si quieres saber qué versión estás corriendo usa el flag `-version`:

```bash
$ ffmpeg -version
ffmpeg version n4.1.4 Copyright (c) 2000-2019 the FFmpeg developers
built with gcc 7 (Ubuntu 7.4.0-1ubuntu1~18.04.1)
configuration: --prefix= --prefix=/usr --disable-debug --disable-doc --disable-static --enable-avisynth --enable-cuda --enable-cuvid --enable-libdrm --enable-ffplay --enable-gnutls --enable-gpl --enable-libass --enable-libfdk-aac --enable-libfontconfig --enable-libfreetype --enable-libmp3lame --enable-libopencore_amrnb --enable-libopencore_amrwb --enable-libopus --enable-libpulse --enable-sdl2 --enable-libspeex --enable-libtheora --enable-libtwolame --enable-libv4l2 --enable-libvorbis --enable-libvpx --enable-libx264 --enable-libx265 --enable-libxcb --enable-libxvid --enable-nonfree --enable-nvenc --enable-omx --enable-openal --enable-opencl --enable-runtime-cpudetect --enable-shared --enable-vaapi --enable-vdpau --enable-version3 --enable-xlib
libavutil      56. 22.100 / 56. 22.100
libavcodec     58. 35.100 / 58. 35.100
libavformat    58. 20.100 / 58. 20.100
libavdevice    58.  5.100 / 58.  5.100
libavfilter     7. 40.101 /  7. 40.101
libswscale      5.  3.100 /  5.  3.100
libswresample   3.  3.100 /  3.  3.100
libpostproc    55.  3.100 / 55.  3.100
```

#### Grabar sólo vídeo

Bota un archivo `.mp4` ideal para reproductores genéricos:

```bash
$ ffmpeg -f x11grab -r 30 -s 1024x768 -i :0.0 record1.mp4
```

Explicación:

```bash
ffmpeg 	        // inicializamos el comando ffmpeg
 -f x11grab 	// fuente para la pantalla
 -r 30 			// frames por segundo
 -s 1024x768 	// resolución de pantalla
 -i :0.0 		// input de la pantlla
 record1.mp4	// nombre del vídeo con su respectivo formato
```

Puedes añadir `-pix_fmt yuv420p`, hace que la salida `ffmpeg` sea a un formato de pixel estándar que todos los reproductores puedan mostrar:

```bash
$ ffmpeg -f x11grab -r 30 -s 1024x768 -i :0.0 -pix_fmt yuv420p output.mp4
```

#### Grabar vídeo con audio interno y micrófono

Primero debes saber las fuentes de sonido con el comando `$ ffmpeg -sources`, luego aparecerá con un `*` para alsa (si está instalado) o pulse (pulseaudio), ejemplo en mi caso:

```bash
$ ffmpeg -sources
Auto-detected sources for pulse:
* alsa_output.pci-0000_00_1b.0.analog-stereo.monitor [Monitor of Audio Interno Estéreo analógico]
  alsa_input.pci-0000_00_1b.0.analog-stereo [Audio Interno Estéreo analógico]
  alsa_output.pci-0000_01_00.0.analog-stereo.monitor [Monitor of CMI8738/CMI8768 PCI Audio (CMI8738/C3DX PCI Audio Device) Estéreo analógico]
  alsa_input.pci-0000_01_00.0.analog-stereo [CMI8738/CMI8768 PCI Audio (CMI8738/C3DX PCI Audio Device) Estéreo analógico]
```

Si verificas con el mezclador gráfico de audio, verás que se recibe entrada de audio desde el micrófono en 'Audio Interno Estéreo analógico'.

```txt
ffmpeg 													// inicializamos el comando ffmpeg

-f pulse 												// instancie el backend de audio
-i alsa_input.pci-0000_00_1b.0.analog-stereo 			// seleccione primera fuente de audio

-f pulse 												// instance nuevamente el backend de audio
-i alsa_output.pci-0000_00_1b.0.analog-stereo.monitor 	// seleccione segunda fuente de audio

-f x11grab 												// fuente para la pantalla
-r 30 													// fps (a veces puede ser 60)
-s 1024x768 											// resolución de pantalla
-i :0.0 												// input de la pantlla
-c:a mp3												// codec de audio (no es necesario)
-b:i 5M 												// velocidad de grabacón (5mps)
-ac 2 													// canales de audio (2 para estéreo, anque ya viene así por defecto)
-async 25 												// sincronización de audios y video (a veces recomiendan 1 o 1000)
-filter_complex amix=inputs=2							// sincroniza las dos fuentes de audio
-pix_fmt yuv420p 										// standard pixel format that all players can show
record1.mkv 											// nombre del vídeo con su respectivo formato
```

**- Versión 1 (funcionó):**

```bash
$ ffmpeg -f pulse -i alsa_input.pci-0000_00_1b.0.analog-stereo -f x11grab -r 30 -s 1024x768 -i :0.0 -ac 2 -async 25 -filter_complex amix=inputs=1 record3.mp4
```

Graba bien el audio del micrófono pero no el audio interno, por ejemplo: reproducción desde YouTube.

**- Versión 2 (funcionó):**

```bash
$ ffmpeg -f pulse -i alsa_input.pci-0000_00_1b.0.analog-stereo -f pulse -i alsa_output.pci-0000_00_1b.0.analog-stereo.monitor -f x11grab -r 30 -s 1024x768 -i :0.0 -ac 2 -async 25 -filter_complex amix=inputs=2 record1.mp4
```

Graba bien ambos audios.

**- Versión 3 (no funcionó):**

```bash
$ ffmpeg -f pulse -i alsa_input.pci-0000_00_1b.0.analog-stereo -f x11grab -r 60 -s 1024x768 -i :0.0 -ac 2 -async 25 -filter_complex amix=inputs=2 record2.mp4
```

Seguro por `-filter_complex amix=inputs=2` al no haber dos fuentes de audio.

---

**References**

Purga Linux. (2020, January 7). Grabar pantalla, micro y audio interno con FFMPEG [Video]. YouTube. https://www.youtube.com/watch?v=vJ5WznUk4Qs

How to Install and Use FFmpeg on Ubuntu 18.04. (2019, December 20). Linuxize. https://linuxize.com/post/how-to-install-ffmpeg-on-ubuntu-18-04/

Use `-pix_fmt yuv420p` to forced ffmpeg's output to a standard pixel format that all players can show: [https://stackoverflow.com/questions/44102207/ffplay-shows-video-but-ffmpeg-just-shows-black](https://stackoverflow.com/questions/44102207/ffplay-shows-video-but-ffmpeg-just-shows-black)

engineerRed. (2019, March 16). ffmpeg black screen recording [Comment on the article “ffmpeg black screen recording”]. Ask Ubuntu. https://askubuntu.com/a/1126289