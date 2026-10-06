import { useState, useEffect } from 'react';
import profilePhoto from '../assets/kuldip.jpg';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  const phrases = [
    'Co-Founder @ DNK Labs',
    'React Native Developer',
    'Mobile App Architect',
  ];

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && typedText === currentPhrase) {
      // Pause at full word before deleting
      const timer = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(timer);
    } else if (isDeleting && typedText === '') {
      // Move to next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timer = setTimeout(() => {
      setTypedText((prev) =>
        isDeleting
          ? currentPhrase.substring(0, prev.length - 1)
          : currentPhrase.substring(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset(window.pageYOffset * 0.4);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 80;
      const targetPosition = targetElement.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="hero">
      <div
        className="hero-background"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />

      <div className="hero-content">
        <div className="hero-image">
          <div className="image-container">
            <img
              src={profilePhoto}
              alt="Bharda Kuldip"
              className="profile-image"
              onError={(e) => {
                e.target.src = '/asset/kuldip.jpg';
              }}
            />
            <div className="image-glow"></div>
          </div>
        </div>

        <div className="hero-text">
          <div className="greeting">
            <span>Hello, I'm</span>
          </div>
          <h1>
            <span className="highlight">Bharda Kuldip</span>
          </h1>
          <div className="typing-text">
            <span className="typing">{typedText}</span>
            <span className="cursor" style={{ animation: 'blink 1s infinite' }}>
              |
            </span>
          </div>
          <p className="hero-description">
            Co-Founder at <strong>DNK Labs</strong> & React Native Specialist. I craft high-performance mobile applications and turn ambitious ideas into scalable digital products across iOS and Android.
          </p>
          <div className="hero-buttons">
            <a
              href="#services"
              className="cta-button primary"
              onClick={(e) => handleScrollTo(e, '#services')}
            >
              <span>DNK Labs Services</span>
              <i className="fas fa-arrow-right"></i>
            </a>
            <a
              href="#projects"
              className="cta-button secondary"
              onClick={(e) => handleScrollTo(e, '#projects')}
            >
              <span>View My Work</span>
              <i className="fas fa-laptop-code"></i>
            </a>
            <a
              href="#contact"
              className="cta-button secondary"
              onClick={(e) => handleScrollTo(e, '#contact')}
            >
              <span>Get In Touch</span>
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>

      <div
        className="scroll-indicator"
        onClick={(e) => handleScrollTo(e, '#about')}
        role="button"
        tabIndex={0}
        aria-label="Scroll to About section"
      >
        <div className="scroll-arrow">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </section>
  );
}
