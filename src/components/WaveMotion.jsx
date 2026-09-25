import { useEffect, useRef, useState } from 'react'

export default function WaveMotion() {
  const videoRef = useRef(null)
  const manuallyPaused = useRef(false)
  const [enabled, setEnabled] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const preference = window.matchMedia('(min-width: 801px) and (prefers-reduced-motion: no-preference)')
    let visible = false
    const update = () => {
      setEnabled(preference.matches)
      if (preference.matches && visible && !document.hidden && !manuallyPaused.current) {
        if (!video.getAttribute('src')) video.src = '/maniac-wave-motion.mp4'
        video.play().catch(() => setPlaying(false))
      } else video.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      update()
    }, { threshold: 0.15 })
    observer.observe(video.parentElement)
    preference.addEventListener('change', update)
    document.addEventListener('visibilitychange', update)
    update()
    return () => {
      observer.disconnect()
      preference.removeEventListener('change', update)
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
    <video ref={videoRef} className="wave-video" muted loop playsInline preload="none"
      poster="/maniac-wave.webp" aria-hidden="true"
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
    {enabled && <button type="button" className="wave-control" onClick={togglePlayback}>
      {playing ? 'Pause wave' : 'Play wave'}
    </button>}
  </>
}
