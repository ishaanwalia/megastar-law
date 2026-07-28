"use client";

// Hero background — a single WebGL pass over the supplied glass-structure
// still: the image is cover-fitted and drifts slowly, its luminance tints
// between ivory and charcoal so it always reads as our palette, and the whole
// scene is refracted through drifting fluted-glass ribs with chromatic
// fringing, plus a teal bloom that trails the cursor with momentum and a
// whisper of film grain. Raw WebGL, no library.
//
// If WebGL is unavailable the same image still shows through a CSS
// background layer underneath the canvas, so the hero never renders blank.
// Freezes entirely under prefers-reduced-motion.

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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
uniform float u_texAspect;

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

// Fit the source into the viewport, anchored to its RIGHT edge — the whole
// subject lives in the right third of the plate, and a centred cover crop
// slices it in half on anything narrower than the image. Horizontal crop is
// capped at 45% so portrait phones letterbox vertically (into the plate's own
// ivory) instead of cropping down to a sliver of the subject.
vec2 plateUv(vec2 uv, float aspect) {
  float w = clamp(aspect / u_texAspect, 0.55, 1.0);
  float h = w * u_texAspect / aspect;
  vec2 c = vec2(
    (1.0 - w) + uv.x * w,
    (1.0 - h) * 0.5 + uv.y * h
  );
  c += vec2(sin(u_time * 0.035), cos(u_time * 0.028)) * 0.008;
  return vec2(c.x, 1.0 - c.y);
}

// Everything sitting behind the glass. The swirl value is computed once in
// main() and passed in, so the three chromatic samples cost three texture
// reads rather than three full fbm evaluations.
vec3 scene(vec2 uv, float aspect, float swirl) {
  vec3 col = mix(IVORY, mix(IVORY, SLATE, 0.5), smoothstep(0.25, 0.85, swirl));

  vec2 puv = plateUv(uv, aspect);
  vec3 img = texture2D(u_tex, puv).rgb;
  float lum = dot(img, vec3(0.299, 0.587, 0.114));
  // Keep the crystal bright and silver — the dark end only bottoms out in the
  // deepest shadow, so the sculpture reads as glass instead of a silhouette.
  vec3 tinted = mix(mix(SLATE, CHAR, 0.35), IVORY, smoothstep(0.02, 0.62, lum));
  // Outside the plate (letterboxed phones) fade back to the swirl rather than
  // smearing the clamped edge rows down the screen.
  float inside = smoothstep(0.0, 0.03, puv.y) * smoothstep(1.0, 0.97, puv.y);
  col = mix(col, tinted, 0.78 * u_hasTex * inside);

  vec2 d = (uv - u_mouse) * vec2(aspect, 1.0);
  float bloom = exp(-dot(d, d) * 3.0);
  col = mix(col, TEAL, bloom * 0.4);
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
  vec2 off = dir * sin(rib * 3.14159265) * 0.022;

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
  imageSrc,
}: {
  className?: string;
  imageSrc: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    // The canvas is opaque once it draws, so hide the CSS fallback beneath it.
    canvas.style.opacity = "1";

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
    const texAspectLoc = gl.getUniformLocation(program, "u_texAspect");

    // Non-power-of-two source, so: clamp + linear, never mipmaps. Seeded with
    // one ivory pixel so the first frames draw before the image decodes.
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

    let hasTex = 0;
    let texAspect = 1;
    let raf = 0;
    let disposed = false;

    const image = new Image();
    image.decoding = "async";
    image.src = imageSrc;
    image.onload = () => {
      if (disposed) return;
      texAspect = image.naturalWidth / Math.max(1, image.naturalHeight);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGB,
        gl.RGB,
        gl.UNSIGNED_BYTE,
        image
      );
      hasTex = 1;
      if (reduceMotion) draw(performance.now());
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

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

      // No pointer yet: drift on a slow orbit so the bloom is never static.
      const tx = pointer ? pointer.x : 0.5 + 0.2 * Math.cos(t * 0.28);
      const ty = pointer ? pointer.y : 0.55 + 0.13 * Math.sin(t * 0.21);
      eased.x += (tx - eased.x) * 0.05;
      eased.y += (ty - eased.y) * 0.05;

      gl!.uniform2f(resolutionLoc, canvas!.width, canvas!.height);
      gl!.uniform1f(timeLoc, t);
      gl!.uniform2f(mouseLoc, eased.x, eased.y);
      gl!.uniform1f(hasTexLoc, hasTex);
      gl!.uniform1f(texAspectLoc, texAspect);
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
      cancelAnimationFrame(raf);
      image.onload = null;
      window.removeEventListener("pointermove", onPointerMove);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [imageSrc]);

  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      {/* Fallback layer: shows the same still if WebGL never comes up. The
          canvas paints over it opaquely once the shader links. */}
      <div
        className="absolute inset-0 bg-cover bg-right opacity-40 saturate-50"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500"
      />
    </div>
  );
}
