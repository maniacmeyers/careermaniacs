import { useEffect, useRef, useState } from 'react'

// The breaking wave, looping while on screen. Phones get a 960px encode; reduced motion keeps the poster still.
export default function WaveMotion({ className = 'wave-media' }) {
  const videoRef = useRef(null)
  const manuallyPaused = useRef(false)
  const [enabled, setEnabled] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const mobile = window.matchMedia('(max-width: 800px)')
    let visible = false
    const update = () => {
      setEnabled(motionOk.matches)
      if (motionOk.matches && visible && !document.hidden && !manuallyPaused.current) {
        const src = mobile.matches ? '/maniac-wave-motion-960.mp4' : '/maniac-wave-motion.mp4'
        if (video.getAttribute('src') !== src) video.src = src
        video.play().catch(() => setPlaying(false))
      } else video.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      update()
    }, { threshold: 0.15 })
    observer.observe(video.parentElement)
    motionOk.addEventListener('change', update)
    document.addEventListener('visibilitychange', update)
    update()
    return () => {
      observer.disconnect()
      motionOk.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', update)
      video.pause()
    }
  }, [])

  const togglePlayback = () => {
    const video = videoRef.current
    manuallyPaused.current = !video.paused
    if (video.paused) video.play().catch(() => setPlaying(false))
    else video.pause()
  }

  return <>
    <div className={className} aria-hidden="true">
      <video ref={videoRef} className="wave-video" muted loop playsInline preload="none"
        poster="/maniac-wave.webp"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    </div>
    {enabled && <button type="button" className="wave-control" onClick={togglePlayback}>
      {playing ? 'Pause wave' : 'Play wave'}
    </button>}
  </>
}
