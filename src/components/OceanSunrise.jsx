import { useEffect, useRef } from 'react'

// Real-time WebGL ocean-sunrise scene — the Interview Maniac motif:
// photo-real translucent turquoise water under a warm red rising sun,
// with the sun's color shimmering down the wave field. Pauses when
// offscreen; renders a single still frame under prefers-reduced-motion;
// falls back to a CSS gradient if WebGL is unavailable.

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y);
}

float fbm(vec2 p){
  float v = 0.0, a = 0.55;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.1 + vec2(17.3, 9.1);
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  float horizon = 0.46;
  vec2 sunPos = vec2(0.64, horizon + 0.05);
  float sunDist = length((uv - sunPos) * vec2(aspect, 1.0));

  vec3 col;

  if (uv.y > horizon) {
    /* ── Dawn sky ── */
    float t = (uv.y - horizon) / (1.0 - horizon);
    vec3 lowSky  = vec3(0.96, 0.38, 0.20);   /* warm red at the waterline */
    vec3 midSky  = vec3(0.85, 0.42, 0.32);
    vec3 highSky = vec3(0.05, 0.14, 0.22);   /* fades to deep teal night */
    col = mix(lowSky, midSky, smoothstep(0.0, 0.25, t));
    col = mix(col, highSky, smoothstep(0.12, 0.85, t));

    /* soft cloud banding */
    float clouds = fbm(vec2(uv.x * 6.0 + uTime * 0.008, uv.y * 18.0));
    col += vec3(0.20, 0.08, 0.05) * clouds * exp(-t * 5.0);

    /* sun disc + bloom */
    float glow = exp(-sunDist * 11.0);
    float disc = smoothstep(0.052, 0.043, sunDist);
    col += vec3(1.0, 0.32, 0.14) * glow * 1.1;
    col = mix(col, vec3(1.0, 0.72, 0.5), disc);
  } else {
    /* ── Water ── */
    float depth = (horizon - uv.y) / horizon;        /* 0 horizon → 1 shore */
    float persp = 1.0 / (0.055 + depth * 0.9);       /* fake plane projection */
    vec2 wuv = vec2((uv.x - 0.5) * aspect * persp, persp);

    float w1 = fbm(wuv * vec2(0.9, 1.6) + vec2(uTime * 0.22, uTime * 0.34));
    float w2 = fbm(wuv * vec2(2.3, 3.4) - vec2(uTime * 0.30, uTime * 0.12));
    float waves = w1 * 0.65 + w2 * 0.35;

    /* translucent turquoise near, deep teal far */
    vec3 shallow = vec3(0.22, 0.78, 0.72);
    vec3 deepC   = vec3(0.015, 0.20, 0.27);
    col = mix(deepC, shallow, depth * 0.72 + waves * 0.22);

    /* see-through crests: light passing through the wave tops */
    float crest = smoothstep(0.62, 0.95, waves);
    col += vec3(0.10, 0.55, 0.50) * crest * (0.25 + depth * 0.75);

    /* the sun's red reflection path, broken up by the wave field */
    float pathW = 0.035 + 0.22 * depth;
    float path = exp(-pow((uv.x - sunPos.x) / pathW, 2.0));
    float sparkle = pow(noise(wuv * vec2(7.0, 3.5) + vec2(-uTime * 0.9, uTime * 0.4)), 3.0);
    float glint = pow(waves, 3.0) * 2.2 + sparkle * 1.6;
    col += vec3(1.0, 0.30, 0.13) * path * glint * (1.15 - depth * 0.75);
    col += vec3(0.95, 0.35, 0.16) * path * 0.22 * (1.0 - depth);

    /* warm haze right at the horizon line */
    col = mix(col, vec3(0.96, 0.42, 0.24), exp(-depth * 26.0) * 0.75);
  }

  /* gentle filmic lift + vignette */
  col = pow(col, vec3(0.92));
  float vig = smoothstep(1.35, 0.45, length(uv - vec2(0.5, 0.42)));
  col *= 0.82 + 0.18 * vig;

  gl_FragColor = vec4(col, 1.0);
}
`

const VERT = 'attribute vec2 aPos; void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }'

const OceanSunrise = ({ className = '' }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uTime = gl.getUniformLocation(prog, 'uTime')

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let visible = true
    const start = performance.now()

    const frame = () => {
      resize()
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!reduced && visible) raf = requestAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !reduced) {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(frame)
      }
    })
    observer.observe(canvas)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ background: 'linear-gradient(180deg, #0a2733 0%, #b34324 46%, #0e5c5e 47%, #063540 100%)' }}
    />
  )
}

export default OceanSunrise
