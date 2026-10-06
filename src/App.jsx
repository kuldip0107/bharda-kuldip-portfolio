import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';
import BackgroundAnimation from './components/BackgroundAnimation';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4500);
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -80px 0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            setActiveSection(id);
          }
          entry.target.classList.add('fade-in-up');
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="portfolio-app">
      <BackgroundAnimation />
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Contact onShowToast={showToast} />
      </main>
      <Footer />
      <Toast toast={toast} onClose={() => setToast({ show: false, message: '', type: 'info' })} />
    </div>
  );
}
