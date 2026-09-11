import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useScrollToHash = () => {
  const location = useLocation()
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const element = location.hash && document.getElementById(location.hash.slice(1))
      const top = element ? element.getBoundingClientRect().top + window.scrollY - 96 : 0
      window.scrollTo({ top, behavior: 'instant' })
    }, 0)
    return () => window.clearTimeout(timer)
  }, [location])
}
export default useScrollToHash
