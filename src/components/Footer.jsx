export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 80;
      const targetPosition = targetElement.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-text">
            <p>&copy; {currentYear} Bharda Kuldip. All rights reserved.</p>
            <p>Built with ❤️ using React Native expertise</p>
          </div>
          <div className="footer-links">
            <a href="#home" onClick={(e) => handleScrollTo(e, '#home')}>
              Home
            </a>
            <a href="#about" onClick={(e) => handleScrollTo(e, '#about')}>
              About
            </a>
            <a href="#services" onClick={(e) => handleScrollTo(e, '#services')}>
              Services
            </a>
            <a href="#projects" onClick={(e) => handleScrollTo(e, '#projects')}>
              Projects
            </a>
            <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
