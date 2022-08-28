---
translationKey: record-video-screen-with-ffmpeg
title: "Record video screen with FFmpeg"
robots: "index,follow"
description: "ffmpeg is a tool that it not only allow functionalyties like format conversion of  multimedia files sino que también grabar vídeo pantalla partiendo desde la interfaz de terminal."
image: "images/post/02.jpg"
date: 2021-04-13T15:33:57+06:00
author: "Adrian Olmedo"
tags: ["ffmpeg"]
categories: ["Tutorials"]
draft: false
---

`ffmpeg` is a cli-tool that in addition to allowing multimedia file format conversion you can also record screen video starting from the terminal interface.

I wrote this tutorial with the version `n4.1.4`, to know it use the flag `-version`:

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

#### Record only video

Get a `.mp4` file ideal for generic players:

```bash
$ ffmpeg -f x11grab -r 30 -s 1024x768 -i :0.0 record1.mp4
```

Explanation:

```bash
ffmpeg 	        // we init ffmpeg
 -f x11grab 	// source for the screen
 -r 30 			// frames per seconds
 -s 1024x768 	// screen resolution
 -i :0.0 		// screen input
 record1.mp4	// title of video with its respective format
```

You can add `-pix_fmt yuv420p`, it makes the `ffmpeg` output in a standar pixel format that all players can display:

```bash
$ ffmpeg -f x11grab -r 30 -s 1024x768 -i :0.0 -pix_fmt yuv420p output.mp4
```

#### Record video with internal audio and microphone

Firts, you need to know the audio sources with `$ ffmpeg -sources` command, then it will show you with `*` for alsa (if installed) or pulse (pulseaudio), example:

```bash
$ ffmpeg -sources
Auto-detected sources for pulse:
* alsa_output.pci-0000_00_1b.0.analog-stereo.monitor [Monitor of Audio Interno Estéreo analógico]
  alsa_input.pci-0000_00_1b.0.analog-stereo [Audio Interno Estéreo analógico]
  alsa_output.pci-0000_01_00.0.analog-stereo.monitor [Monitor of CMI8738/CMI8768 PCI Audio (CMI8738/C3DX PCI Audio Device) Estéreo analógico]
  alsa_input.pci-0000_01_00.0.analog-stereo [CMI8738/CMI8768 PCI Audio (CMI8738/C3DX PCI Audio Device) Estéreo analógico]
```

If you check with the graphical audio mixer, you will see that audio input is received from the microphone in 'Analog Stereo Internal Audio'.

```txt
ffmpeg 													// we init ffmpeg

-f pulse 												// audio backend instance
-i alsa_input.pci-0000_00_1b.0.analog-stereo 			// select the first audio source

-f pulse 												// instantiate the audio backend again
-i alsa_output.pci-0000_00_1b.0.analog-stereo.monitor 	// seleccione segunda fuente de audio

-f x11grab 												// source for the screen
-r 30 													// fps (sometimes it can be 60)
-s 1024x768 											// screen resolution
-i :0.0 												// screen input
-c:a mp3												// audio codec (tt's not necesary)
-b:i 5M 												// recording speed (5mps)
-ac 2 													// audio channels (2 for estereo, although it already comes like this by default)
-async 25 												// audio and video sync (sometimes 1 or 1000 recommended)
-filter_complex amix=inputs=2							// synchronize the two audio sources
-pix_fmt yuv420p 										// standard pixel format that all players can show
record1.mkv 											// name of the video with its respective format
```

**- Version 1 (it worked):**

```bash
$ ffmpeg -f pulse -i alsa_input.pci-0000_00_1b.0.analog-stereo -f x11grab -r 30 -s 1024x768 -i :0.0 -ac 2 -async 25 -filter_complex amix=inputs=1 record3.mp4
```

It records microphone audio fine but not internal audio, eg: playback from YouTube.

**- Version 2 (it worked):**

```bash
$ ffmpeg -f pulse -i alsa_input.pci-0000_00_1b.0.analog-stereo -f pulse -i alsa_output.pci-0000_00_1b.0.analog-stereo.monitor -f x11grab -r 30 -s 1024x768 -i :0.0 -ac 2 -async 25 -filter_complex amix=inputs=2 record1.mp4
```

Record both audios.

**- Version 3 (it worked):**

```bash
$ ffmpeg -f pulse -i alsa_input.pci-0000_00_1b.0.analog-stereo -f x11grab -r 60 -s 1024x768 -i :0.0 -ac 2 -async 25 -filter_complex amix=inputs=2 record2.mp4
```

Sure by `-filter_complex amix=inputs=2` since there are not two audio sources.

---

**References**

Purga Linux. (2020, January 7). Grabar pantalla, micro y audio interno con FFMPEG [Video]. YouTube. https://www.youtube.com/watch?v=vJ5WznUk4Qs

How to Install and Use FFmpeg on Ubuntu 18.04. (2019, December 20). Linuxize. https://linuxize.com/post/how-to-install-ffmpeg-on-ubuntu-18-04/

Use `-pix_fmt yuv420p` to forced ffmpeg's output to a standard pixel format that all players can show: [https://stackoverflow.com/questions/44102207/ffplay-shows-video-but-ffmpeg-just-shows-black](https://stackoverflow.com/questions/44102207/ffplay-shows-video-but-ffmpeg-just-shows-black)

engineerRed. (2019, March 16). ffmpeg black screen recording [Comment on the article “ffmpeg black screen recording”]. Ask Ubuntu. https://askubuntu.com/a/1126289