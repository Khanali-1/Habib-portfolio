/** Concentric rings of brand-icon tiles orbiting a floating core. Items are dealt across rings; rings alternate direction. */
export default function Orbit({ items, size = "min(88vw, 440px)", radii = ["38%"], badge = "clamp(44px, 12vw, 60px)", children }) {
  const rings = radii.length;
  const groups = Array.from({ length: rings }, (_, r) => items.filter((_, i) => i % rings === r));
  return (
    <div className="scene orbit-pause relative">
      <div className="orbit-glow" aria-hidden="true" />
      <div className="orbit-stage" style={{ "--size": size }}>
        {groups.map((g, r) => (
          <div key={r}>
            <div className="orbit-ring" style={{ width: `calc(var(--size) * ${parseFloat(radii[r]) / 50})`, height: `calc(var(--size) * ${parseFloat(radii[r]) / 50})` }} />
            <div className={`orbit ${r % 2 ? "reverse" : ""}`} style={{ "--dur": `${34 + r * 12}s` }}>
              {g.map((it, i) => {
                const Icon = it.icon;
                return (
                  <div key={it.label} className="orbit-item" style={{ "--i": i, "--n": g.length, "--r": `calc(var(--size) * ${parseFloat(radii[r]) / 100})`, "--b": badge }}>
                    <div className="orbit-badge">
                      <span role="img" aria-label={it.label} title={it.label} style={{ "--c": it.color }}><Icon aria-hidden="true" /></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div className="orbit-core">{children}</div>
      </div>
    </div>
  );
}
