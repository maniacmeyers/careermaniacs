import { useEffect, useRef, useState } from 'react'

// Horizon row (0 = top, 1 = bottom) measured from each still. Only water below it moves.
const HORIZON = { '/ocean-editorial-dawn.webp': 0.372, '/ocean-editorial-calm.webp': 0.38 }

// Mirrors each section's CSS background sizing so the live water lands on the still's exact pixels.
const FITS = {
  hero: (mobile) => (mobile ? { height: 900, px: 0.5, py: 0 } : { px: 0.5, py: 0.5 }),
  top: () => ({ px: 0.5, py: 0 }),
  center: () => ({ px: 0.5, py: 0.5 }),
}

const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'
const FRAG = `precision mediump float;
uniform sampler2D uTex;uniform vec2 uRes;uniform vec4 uDraw;uniform float uTime;uniform float uHorizon;
void main(){
  vec2 uv=(vec2(gl_FragCoord.x,uRes.y-gl_FragCoord.y)-uDraw.xy)/uDraw.zw;
  if(uv.x<0.||uv.x>1.||uv.y<0.||uv.y>1.){gl_FragColor=vec4(0.);return;}
  vec2 s=uv;float glint=0.;float d=uv.y-uHorizon;
  if(d>0.){
    float depth=d/(1.-uHorizon);
    float persp=1./(depth+.06);
    float t=uTime;
    float w1=sin(uv.y*22.*persp-t*1.1+sin(uv.x*6.+t*.3)*1.5);
    float w2=sin(uv.x*38.+uv.y*28.*persp-t*1.7);
    float w3=sin(uv.x*11.-uv.y*12.*persp+t*.8);
    float amp=mix(.0006,.0065,depth);
    s.y+=amp*(w1*.6+w2*.3);
    s.x+=amp*.8*(w3*.6+w2*.3);
    s.y=max(s.y,uHorizon+.0015);
    glint=max(w1*w2,0.);
  }
  vec4 c=texture2D(uTex,s);
  float lum=dot(c.rgb,vec3(.299,.587,.114));
  c.rgb+=c.rgb*glint*smoothstep(.45,.9,lum)*.35;
  gl_FragColor=vec4(c.rgb,1.);
}`

// ponytail: one WebGL context per scene, 30fps cap, runs only while visible; the CSS still is the fallback.
export default function OceanScene({ src, fit = 'center', className = '' }) {
  const canvasRef = useRef(null)
  const paused = useRef(false)
  const [live, setLive] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [still, setStill] = useState(false)
  const toggle = useRef(() => {})

  useEffect(() => {
    const canvas = canvasRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobile = window.matchMedia('(max-width: 800px)')
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false })
    if (!gl) return

    const shader = (type, source) => { const s = gl.createShader(type); gl.shaderSource(s, source); gl.compileShader(s); return s }
    const program = gl.createProgram()
    gl.attachShader(program, shader(gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(program, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = Object.fromEntries(['uRes', 'uDraw', 'uTime', 'uHorizon'].map(n => [n, gl.getUniformLocation(program, n)]))
    gl.uniform1f(u.uHorizon, HORIZON[src] ?? 0.4)

    let image, raf = 0, visible = false, last = 0, dead = false
    const start = performance.now()

    const size = () => {
      if (!image) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const W = canvas.clientWidth, H = canvas.clientHeight
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      const f = FITS[fit](mobile.matches)
      const scale = f.height ? f.height / image.height : Math.max(W / image.width, H / image.height)
      const dw = image.width * scale, dh = image.height * scale
      gl.uniform2f(u.uRes, canvas.width, canvas.height)
      gl.uniform4f(u.uDraw, (W - dw) * f.px * dpr, (H - dh) * f.py * dpr, dw * dpr, dh * dpr)
    }
    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      if (now - last < 33) return
      last = now
      gl.uniform1f(u.uTime, (now - start) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    const update = () => {
      const run = !dead && image && visible && !document.hidden && !reduced.matches && !paused.current
      if (run && !raf) raf = requestAnimationFrame(frame)
      if (!run && raf) { cancelAnimationFrame(raf); raf = 0 }
      setStill(reduced.matches)
    }
    toggle.current = () => { paused.current = !paused.current; setUserPaused(paused.current); update() }

    const img = new Image()
    img.onload = () => {
      if (dead) return
      const tex = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      for (const [k, v] of [[gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE], [gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR]]) gl.texParameteri(gl.TEXTURE_2D, k, v)
      image = img
      size()
      gl.uniform1f(u.uTime, 0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      setLive(true)
      update()
    }
    img.src = src

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; update() })
    io.observe(canvas)
    const ro = new ResizeObserver(() => { size(); if (!raf && image) gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4) })
    ro.observe(canvas)
    const lost = (e) => { e.preventDefault(); dead = true; setLive(false); update() }
    canvas.addEventListener('webglcontextlost', lost)
    document.addEventListener('visibilitychange', update)
    reduced.addEventListener('change', update)
    mobile.addEventListener('change', size)
    return () => {
      dead = true
      cancelAnimationFrame(raf)
      io.disconnect(); ro.disconnect()
      canvas.removeEventListener('webglcontextlost', lost)
      document.removeEventListener('visibilitychange', update)
      reduced.removeEventListener('change', update)
      mobile.removeEventListener('change', size)
    }
  }, [src, fit])

  return <>
    <div className={`ocean-scene ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className={live ? 'is-live' : undefined} />
    </div>
    {live && !still && <button type="button" className="scene-control" onClick={() => toggle.current()}>
      {userPaused ? 'Play water' : 'Pause water'}
    </button>}
  </>
}
