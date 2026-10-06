import { useState, useEffect } from 'react';

export default function Header({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 70;
      const targetPosition = targetElement.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      style={{
        background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.88)',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'var(--shadow)',
        transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <nav>
        <div className="logo" onClick={(e) => handleNavClick(e, '#home')}>
          <span className="logo-text">BK</span>
          <span className="logo-subtitle">Developer</span>
        </div>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
              </a>
            </li>
          ))}
          <li className="mobile-cta-wrapper">
            <a
              href="#contact"
              className="cta-button primary"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              <span>Hire Me</span>
              <i className="fas fa-paper-plane"></i>
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <a
            href="#contact"
            className="nav-cta desktop-only"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Hire Me
          </a>

          <div
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            role="button"
            tabIndex={0}
          >
            <div
              className="line"
              style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}}
            />
            <div
              className="line"
              style={menuOpen ? { opacity: 0 } : {}}
            />
            <div
              className="line"
              style={menuOpen ? { transform: 'rotate(-45deg) translate(7px, -6px)' } : {}}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
