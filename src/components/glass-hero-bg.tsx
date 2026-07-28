"use client";

// Hero background — the three requested effects collapsed into ONE canvas
// instead of three stacked layers:
//   1. a source clip played as a seamless boomerang (forward, then reverse),
//   2. fluted-glass refraction with chromatic fringing at the rib edges,
//   3. a teal bloom that follows the cursor with momentum, plus film grain.
// The clip is never shown directly — its luminance drives a tint between
// ivory and charcoal, so the motion reads as our palette regardless of what
// the footage actually looks like, and the page stays legible over it.
// Raw WebGL, no library. Degrades to plain background if WebGL or the video
// is unavailable; freezes entirely under prefers-reduced-motion.

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// ponytail: ~3.2s of loop held in memory at 640px. Bump both only if the
// source clip is longer AND the memory budget on mobile allows it.
const MAX_FRAMES = 96;
const CAPTURE_WIDTH = 640;
const FRAME_MS = 1000 / 30;

const VERTEX_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SRC = `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_tex;
uniform float u_hasTex;

const vec3 IVORY = vec3(0.973, 0.961, 0.941);
const vec3 TEAL  = vec3(0.227, 0.420, 0.420);
const vec3 SLATE = vec3(0.361, 0.420, 0.478);
const vec3 CHAR  = vec3(0.122, 0.165, 0.200);

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 3; i++) {
    v += amp * noise(p);
    p *= 2.0;
    amp *= 0.5;
  }
  return v;
}

// Everything sitting behind the glass. The swirl value is computed once in
// main() and passed in, so the three chromatic samples cost three texture
// reads rather than three full fbm evaluations.
vec3 scene(vec2 uv, float aspect, float swirl) {
  vec3 col = mix(IVORY, mix(IVORY, SLATE, 0.5), smoothstep(0.25, 0.85, swirl));

  vec3 v = texture2D(u_tex, vec2(uv.x, 1.0 - uv.y)).rgb;
  float lum = dot(v, vec3(0.299, 0.587, 0.114));
  vec3 tinted = mix(mix(CHAR, SLATE, 0.6), IVORY, smoothstep(0.04, 0.78, lum));
  col = mix(col, tinted, 0.5 * u_hasTex);

  vec2 d = (uv - u_mouse) * vec2(aspect, 1.0);
  float bloom = exp(-dot(d, d) * 3.0);
  col = mix(col, TEAL, bloom * 0.45);
  col = mix(col, IVORY, bloom * bloom * 0.3);
  return col;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  float t = u_time * 0.04;

  // Fluted glass: diagonal ribs at 31 degrees, drifting slowly. Each rib is
  // a rounded lens, so the surface normal — and with it the refraction
  // offset — sweeps across the rib and pinches at its edges.
  float a = radians(31.0);
  vec2 dir = vec2(cos(a), sin(a));
  float rib = fract(dot(uv * vec2(aspect, 1.0), dir) * 8.0 + u_time * 0.15) - 0.5;
  vec2 off = dir * sin(rib * 3.14159265) * 0.035;

  float swirl = fbm((uv + off) * 2.4 + vec2(t, -t * 0.7));

  // Chromatic fringing — the three channels refract by slightly different
  // amounts, which is what makes glass read as glass.
  float ab = 0.012;
  vec3 col;
  col.r = scene(uv + off * (1.0 + ab), aspect, swirl).r;
  col.g = scene(uv + off, aspect, swirl).g;
  col.b = scene(uv + off * (1.0 - ab), aspect, swirl).b;

  col += pow(abs(rib) * 2.0, 4.0) * 0.13;
  col += (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.05;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function GlassHeroBg({
  className,
  videoSrc,
}: {
  className?: string;
  videoSrc?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");
    const hasTexLoc = gl.getUniformLocation(program, "u_hasTex");

    // Non-power-of-two source, so: clamp + linear, never mipmaps. Seeded with
    // one ivory pixel so the first frames draw correctly before any video.
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGB,
      1,
      1,
      0,
      gl.RGB,
      gl.UNSIGNED_BYTE,
      new Uint8Array([248, 245, 240])
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(gl.getUniformLocation(program, "u_tex"), 0);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const video = reduceMotion ? null : videoRef.current;
    const frames: ImageBitmap[] = [];
    let hasTex = 0;
    let capturing = !!video;
    let capturePending = false;
    let lastCapturedTime = -1;
    let frameIdx = 0;
    let frameStep = 1;
    let lastSwap = 0;
    let raf = 0;
    let captureRaf = 0;
    let disposed = false;

    // Target follows the pointer; the drawn position eases toward it, which
    // is where the "momentum" in the bloom comes from.
    const eased = { x: 0.5, y: 0.55 };
    let pointer: { x: number; y: number } | null = null;

    function onPointerMove(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      pointer = {
        x: (e.clientX - r.left) / r.width,
        y: 1 - (e.clientY - r.top) / r.height,
      };
    }
    if (!reduceMotion) window.addEventListener("pointermove", onPointerMove);

    function upload(source: TexImageSource) {
      try {
        gl!.texImage2D(
          gl!.TEXTURE_2D,
          0,
          gl!.RGB,
          gl!.RGB,
          gl!.UNSIGNED_BYTE,
          source
        );
        hasTex = 1;
      } catch {
        // Cross-origin video without CORS headers taints the texture. Drop
        // the video layer; the glass + bloom still carry the hero.
        hasTex = 0;
        capturing = false;
      }
    }

    // Capture pass: grab each decoded frame once (deduped by currentTime),
    // downscaled, until the cap is hit or the clip ends.
    function capture() {
      if (disposed || !video || !capturing) return;
      if (
        !capturePending &&
        video.currentTime !== lastCapturedTime &&
        video.videoWidth > 0 &&
        frames.length < MAX_FRAMES
      ) {
        lastCapturedTime = video.currentTime;
        capturePending = true;
        const h = Math.max(
          1,
          Math.round((CAPTURE_WIDTH * video.videoHeight) / video.videoWidth)
        );
        createImageBitmap(video, {
          resizeWidth: CAPTURE_WIDTH,
          resizeHeight: h,
          resizeQuality: "low",
        })
          .then((bitmap) => {
            if (disposed || !capturing) bitmap.close();
            else frames.push(bitmap);
          })
          .catch(() => {
            capturing = false;
          })
          .finally(() => {
            capturePending = false;
          });
      }
      if (frames.length >= MAX_FRAMES) {
        capturing = false;
        video.pause();
        return;
      }
      if ("requestVideoFrameCallback" in video) {
        video.requestVideoFrameCallback(capture);
      } else {
        captureRaf = requestAnimationFrame(capture);
      }
    }

    function onEnded() {
      capturing = false;
      if (frames.length > 1 || !video) return;
      // Too few frames to boomerang — a backgrounded tab throttles the
      // capture callback to a crawl. Fall back to a plain native loop, still
      // fed live into the texture, rather than freezing on a still.
      video.loop = true;
      video.play().catch(() => {});
    }

    // The clip is ~10 MB. The shader alone already carries the hero, so the
    // download is deferred until after load — motion joins a beat later
    // rather than competing with the LCP paint for bandwidth.
    function startVideo() {
      if (disposed || !video) return;
      video.play().then(capture, () => {
        capturing = false;
      });
    }
    let startTimer = 0;
    function scheduleVideo() {
      startTimer = window.setTimeout(startVideo, 400);
    }
    if (video) {
      video.addEventListener("ended", onEnded);
      if (document.readyState === "complete") scheduleVideo();
      else window.addEventListener("load", scheduleVideo, { once: true });
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const width = Math.round(canvas!.clientWidth * dpr);
      const height = Math.round(canvas!.clientHeight * dpr);
      if (canvas!.width !== width || canvas!.height !== height) {
        canvas!.width = width;
        canvas!.height = height;
        gl!.viewport(0, 0, width, height);
      }
    }

    function draw(now: number) {
      resize();
      const t = now * 0.001;

      // Ping-pong the captured frames; before they exist, feed the live video.
      if (frames.length > 1) {
        if (now - lastSwap >= FRAME_MS) {
          lastSwap = now;
          frameIdx += frameStep;
          if (frameIdx >= frames.length - 1) {
            frameIdx = frames.length - 1;
            frameStep = -1;
          } else if (frameIdx <= 0) {
            frameIdx = 0;
            frameStep = 1;
          }
          upload(frames[frameIdx]);
        }
      } else if (video && !video.paused && video.readyState >= 2) {
        upload(video);
      }

      // No pointer yet: drift on a slow orbit so the bloom is never static.
      const tx = pointer ? pointer.x : 0.5 + 0.2 * Math.cos(t * 0.28);
      const ty = pointer ? pointer.y : 0.55 + 0.13 * Math.sin(t * 0.21);
      eased.x += (tx - eased.x) * 0.05;
      eased.y += (ty - eased.y) * 0.05;

      gl!.uniform2f(resolutionLoc, canvas!.width, canvas!.height);
      gl!.uniform1f(timeLoc, t);
      gl!.uniform2f(mouseLoc, eased.x, eased.y);
      gl!.uniform1f(hasTexLoc, hasTex);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    }

    resize();
    draw(0);

    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(canvas);
    else window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      capturing = false;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(captureRaf);
      clearTimeout(startTimer);
      window.removeEventListener("load", scheduleVideo);
      window.removeEventListener("pointermove", onPointerMove);
      if (video) {
        video.removeEventListener("ended", onEnded);
        video.pause();
      }
      frames.forEach((f) => f.close());
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="metadata"
          crossOrigin="anonymous"
          className="pointer-events-none absolute size-px opacity-0"
        />
      )}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
