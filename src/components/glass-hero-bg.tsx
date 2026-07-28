"use client";

// Hero background — pure fluted glass. A drifting swirl seen through diagonal
// ribs that refract with chromatic fringing, plus a teal bloom trailing the
// cursor with momentum and a whisper of film grain.
//
// The sculpture is NOT in here. It sits above this canvas as its own layer so
// the ribs never touch it — sampling her into the shader is what made the
// scales and sword disappear. Raw WebGL, no library; freezes entirely under
// prefers-reduced-motion, and degrades to plain background with no WebGL.

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

const vec3 IVORY = vec3(0.973, 0.961, 0.941);
const vec3 TEAL  = vec3(0.227, 0.420, 0.420);
const vec3 SLATE = vec3(0.361, 0.420, 0.478);

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

vec3 scene(vec2 uv, float aspect, float swirl) {
  vec3 col = mix(IVORY, mix(IVORY, SLATE, 0.42), smoothstep(0.22, 0.88, swirl));
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

  // Diagonal ribs at 31 degrees, drifting slowly. Each rib is a rounded lens,
  // so the surface normal — and with it the refraction offset — sweeps across
  // the rib and pinches at its edges.
  float a = radians(31.0);
  vec2 dir = vec2(cos(a), sin(a));
  float rib = fract(dot(uv * vec2(aspect, 1.0), dir) * 8.0 + u_time * 0.15) - 0.5;
  vec2 off = dir * sin(rib * 3.14159265) * 0.03;

  float swirl = fbm((uv + off) * 2.4 + vec2(t, -t * 0.7));

  float ab = 0.014;
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

export function GlassHeroBg({ className }: { className?: string }) {
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

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
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
      const tx = pointer ? pointer.x : 0.5 + 0.2 * Math.cos(t * 0.28);
      const ty = pointer ? pointer.y : 0.55 + 0.13 * Math.sin(t * 0.21);
      eased.x += (tx - eased.x) * 0.05;
      eased.y += (ty - eased.y) * 0.05;

      gl!.uniform2f(resolutionLoc, canvas!.width, canvas!.height);
      gl!.uniform1f(timeLoc, t);
      gl!.uniform2f(mouseLoc, eased.x, eased.y);
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
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500"
      />
    </div>
  );
}
