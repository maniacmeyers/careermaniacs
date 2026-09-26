import OceanScene from './OceanScene'
import WaveMotion from './WaveMotion'

const images = {
  dawn: '/ocean-editorial-dawn.webp',
  calm: '/ocean-editorial-calm.webp',
  wave: '/maniac-wave.webp',
}

// Interior pages open on the same water as the homepage: copy left, moving ocean right.
export default function PageHero({ title, image = 'dawn', aside, children }) {
  return (
    <section className="page-hero" style={{ '--hero-image': `url(${images[image]})` }}>
      {image === 'wave'
        ? <WaveMotion className="page-hero-media" />
        : <OceanScene src={images[image]} fit="center" className="page-hero-media" />}
      <div className="wrap page-hero-layout">
        <div className="page-hero-copy">
          <h1 className="display">{title}</h1>
          {children}
        </div>
        {aside}
      </div>
    </section>
  )
}
