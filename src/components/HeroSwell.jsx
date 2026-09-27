import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import OceanScene from './OceanScene'

// The swell building in the sunrise water, looping (rise, cover the sun, settle) while the hero
// is on screen. The frame stays pinned while the hero scrolls away, so the swell stays in view.
// iOS never preloads video, so playback starts immediately and the video is revealed once it is
// actually playing. If the browser refuses autoplay (iPhone Low Power Mode, data saver), the live
// WebGL water takes over so the hero still moves. Reduced motion never loads the video.
export default function HeroSwell() {
  const videoRef = useRef(null)
  const manuallyPaused = useRef(false)
  const [shown, setShown] = useState(false)
  const [fallback, setFallback] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)')
    if (!motionOk.matches) return
    const wrap = video.parentElement
    const section = wrap.closest('section')
    let visible = true, started = false, raf = 0, dead = false, giveUp = 0

    const update = () => {
      if (!started) return
      if (visible && !document.hidden && !manuallyPaused.current) video.play().catch(() => {})
      else video.pause()
    }
    const pin = () => {
      raf = 0
      const rect = section.getBoundingClientRect()
      wrap.style.transform = `translate3d(0, ${Math.min(rect.height, Math.max(0, -rect.top))}px, 0)`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(pin) }
    const fail = () => { if (!started && !dead) { video.removeAttribute('src'); video.load(); setFallback(true) } }
    const start = () => {
      if (dead) return
      video.muted = true
      video.setAttribute('muted', '')
      video.setAttribute('playsinline', '')
      video.src = window.matchMedia('(max-width: 800px)').matches ? '/hero-swell-960.mp4' : '/hero-swell.mp4'
      video.addEventListener('playing', () => {
        clearTimeout(giveUp)
        started = true
        setShown(true)
        update()
      }, { once: true })
      video.play().catch(fail)
      giveUp = setTimeout(fail, 6000)
    }
    // Start after the page settles so the hero still stays the first paint.
    const idle = window.requestIdleCallback ? requestIdleCallback(start, { timeout: 1500 }) : setTimeout(start, 600)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; update() })
    io.observe(section)
    document.addEventListener('visibilitychange', update)
    window.addEventListener('scroll', onScroll, { passive: true })
    pin()
    return () => {
      dead = true
      window.cancelIdleCallback?.(idle); clearTimeout(idle); clearTimeout(giveUp)
      cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener('visibilitychange', update)
      window.removeEventListener('scroll', onScroll)
      video.pause()
    }
  }, [])

  const toggle = () => {
    const video = videoRef.current
    manuallyPaused.current = !video.paused
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }

  return <>
    {fallback && <OceanScene src="/ocean-editorial-dawn.webp" fit="hero" />}
    <div className={`hero-swell${shown ? ' is-shown' : ''}`} aria-hidden="true">
      <video ref={videoRef} muted loop playsInline preload="none"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    </div>
    {shown && <button type="button" className="scene-control" aria-label={playing ? 'Pause swell video' : 'Play swell video'} onClick={toggle}>
      {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
    </button>}
  </>
}
