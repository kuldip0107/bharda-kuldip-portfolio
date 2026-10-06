export default function BackgroundAnimation() {
  const bubbles = [
    { id: 1, size: 12, left: 4, duration: 15, delay: -2 },
    { id: 2, size: 20, left: 9, duration: 18, delay: -9 },
    { id: 3, size: 8, left: 14, duration: 13, delay: -5 },
    { id: 4, size: 16, left: 19, duration: 16, delay: -12 },
    { id: 5, size: 10, left: 25, duration: 14, delay: -3 },
    { id: 6, size: 24, left: 31, duration: 21, delay: -15 },
    { id: 7, size: 14, left: 36, duration: 17, delay: -7 },
    { id: 8, size: 18, left: 42, duration: 19, delay: -11 },
    { id: 9, size: 9, left: 48, duration: 12, delay: -4 },
    { id: 10, size: 22, left: 53, duration: 20, delay: -14 },
    { id: 11, size: 11, left: 58, duration: 15, delay: -1 },
    { id: 12, size: 16, left: 64, duration: 17, delay: -8 },
    { id: 13, size: 13, left: 69, duration: 14, delay: -16 },
    { id: 14, size: 20, left: 74, duration: 19, delay: -6 },
    { id: 15, size: 8, left: 79, duration: 13, delay: -10 },
    { id: 16, size: 15, left: 85, duration: 16, delay: -2 },
    { id: 17, size: 22, left: 90, duration: 22, delay: -13 },
    { id: 18, size: 10, left: 95, duration: 14, delay: -7 },
    { id: 19, size: 14, left: 12, duration: 18, delay: -17 },
    { id: 20, size: 18, left: 28, duration: 16, delay: -4 },
    { id: 21, size: 12, left: 45, duration: 15, delay: -18 },
    { id: 22, size: 16, left: 62, duration: 17, delay: -10 },
    { id: 23, size: 9, left: 78, duration: 13, delay: -19 },
    { id: 24, size: 21, left: 88, duration: 20, delay: -3 },
    { id: 25, size: 11, left: 97, duration: 14, delay: -11 },
  ];

  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="bubbles-container">
        {bubbles.map((b) => (
          <span
            key={b.id}
            className="floating-bubble"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
