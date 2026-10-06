import { useEffect, useState, useRef } from 'react';

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Use refs for 60fps smooth animation without React re-render lag
  const mousePos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const outerGlowRef = useRef(null);
  const innerGlowRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    // Check if the device has a pointer/mouse
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasMouse) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if mouse is hovering over interactive elements
      const target = e.target;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.project-card') ||
        target.closest('.service-card') ||
        target.closest('.skill-card') ||
        target.closest('.contact-item')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth lerp loop for fluid, floating motion
    const animate = () => {
      // Lerp speed: 0.12 gives a soft, silky trailing inertia
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.12;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.12;

      if (outerGlowRef.current) {
        outerGlowRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      if (innerGlowRef.current) {
        // Inner glow follows slightly faster (0.22) for depth
        const innerX = currentPos.current.x + (mousePos.current.x - currentPos.current.x) * 0.1;
        const innerY = currentPos.current.y + (mousePos.current.y - currentPos.current.y) * 0.1;
        innerGlowRef.current.style.transform = `translate3d(${innerX}px, ${innerY}px, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isVisible]);

  return (
    <div
      className={`cursor-glow-container ${isHovering ? 'is-hovering' : ''}`}
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      <div ref={outerGlowRef} className="cursor-glow-outer" />
      <div ref={innerGlowRef} className="cursor-glow-inner" />
    </div>
  );
}
