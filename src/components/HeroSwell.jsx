import { useEffect, useRef, useState } from 'react'

const IDLE = 0.4 // share of the clip that plays on its own; scrolling drives the rest

// The swell building in the sunrise water. Plays the first ~4s once, holds, then the
// scroll toward the Maniac Method wave carries it to full height. The CSS still is the
// poster and fallback; reduced motion never loads the video.
export default function HeroSwell() {
  const videoRef = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)')
    if (!motionOk.matches) return
    const section = video.closest('section')
    let idleDone = false, raf = 0, dead = false

    const wrap = video.parentElement
    const target = () => {
      const rect = section.getBoundingClientRect()
      const px = Math.min(rect.height, Math.max(0, -rect.top))
      // Pin the frame while the hero scrolls away, so the swell builds in view.
      wrap.style.transform = `translate3d(0, ${px}px, 0)`
      return video.duration * (IDLE + (1 - IDLE) * Math.min(1, px / (rect.height * 0.8)))
    }
    const seek = () => {
      raf = 0
      if (dead || !video.duration) return
      const goal = target()
      if (!idleDone) return
      const t = Math.max(goal, video.duration * IDLE)
      if (Math.abs(video.currentTime - t) > 0.03) video.currentTime = t
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(seek) }
    const onTime = () => {
      if (!idleDone && video.currentTime >= video.duration * IDLE) {
        idleDone = true
        video.pause()
        seek()
      }
    }

    const start = () => {
      if (dead) return
      video.preload = 'auto'
      video.src = window.matchMedia('(max-width: 800px)').matches ? '/hero-swell-960.mp4' : '/hero-swell.mp4'
      video.addEventListener('loadeddata', () => { setShown(true); video.play().catch(() => { idleDone = true; seek() }) }, { once: true })
    }
    // Load after the page settles so the hero still stays the first paint.
    const idle = window.requestIdleCallback ? requestIdleCallback(start, { timeout: 1500 }) : setTimeout(start, 600)
    video.addEventListener('timeupdate', onTime)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      dead = true
      window.cancelIdleCallback?.(idle); clearTimeout(idle)
      cancelAnimationFrame(raf)
      video.removeEventListener('timeupdate', onTime)
      window.removeEventListener('scroll', onScroll)
      video.pause()
    }
  }, [])

  return <div className={`hero-swell${shown ? ' is-shown' : ''}`} aria-hidden="true">
    <video ref={videoRef} muted playsInline preload="none" />
  </div>
}
