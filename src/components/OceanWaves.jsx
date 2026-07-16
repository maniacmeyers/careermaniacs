// Three layered SVG waves that roll horizontally — the Interview Maniac
// ocean motif. Rendered as data-URI backgrounds so there are no extra
// network requests; parent must be position: relative.
const waveSvg = (color, opacity) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z' fill='${encodeURIComponent(color)}' fill-opacity='${opacity}'/%3E%3C/svg%3E")`

const OceanWaves = () => (
  <div className="ocean" aria-hidden="true">
    <div className="wave" style={{ backgroundImage: waveSvg('#22d3ee', '0.35') }} />
    <div className="wave" style={{ backgroundImage: waveSvg('#0891b2', '0.4') }} />
    <div className="wave" style={{ backgroundImage: waveSvg('#34d399', '0.25') }} />
  </div>
)

export default OceanWaves
