import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// New page: jump to the top before paint (or to #hash once rendered). The browser's own scroll
// restoration is off so Safari can't put the visitor back mid-page after a link click.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

const jump = (top) => {
  const root = document.documentElement
  const prev = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  window.scrollTo(0, top)
  root.style.scrollBehavior = prev
}

export const useScrollToHash = () => {
  const location = useLocation()
  useLayoutEffect(() => {
    if (!location.hash) { jump(0); return }
    const frame = requestAnimationFrame(() => {
      const element = document.getElementById(location.hash.slice(1))
      jump(element ? element.getBoundingClientRect().top + window.scrollY - 96 : 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [location.pathname, location.hash, location.key])
}
export default useScrollToHash
