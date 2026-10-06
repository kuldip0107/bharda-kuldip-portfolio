export default function BackgroundAnimation() {
  return (
    <div className="ambient-background" aria-hidden="true">
      {/* Subtle developer grid pattern */}
      <div className="bg-grid-mesh" />

      {/* Floating luminous aurora orbs */}
      <div className="aurora-orb orb-1" />
      <div className="aurora-orb orb-2" />
      <div className="aurora-orb orb-3" />
      <div className="aurora-orb orb-4" />

      {/* Floating ambient particles */}
      <div className="ambient-particles">
        <span className="particle p-1" />
        <span className="particle p-2" />
        <span className="particle p-3" />
        <span className="particle p-4" />
        <span className="particle p-5" />
        <span className="particle p-6" />
        <span className="particle p-7" />
        <span className="particle p-8" />
      </div>
    </div>
  );
}
