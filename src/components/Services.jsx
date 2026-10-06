export default function Services() {
  const services = [
    {
      icon: 'fas fa-mobile-alt',
      title: 'Cross-Platform Mobile Apps',
      badge: 'Core Expertise',
      description:
        'End-to-end React Native mobile app development for iOS and Android with 60fps animations, native module integration, and offline-first capabilities.',
      features: ['iOS & Android Apps', 'Native Modules', 'High Performance', 'App Store & Play Store Deployment'],
    },
    {
      icon: 'fas fa-rocket',
      title: 'Startup MVP Development',
      badge: 'Fast-Track',
      description:
        'Transforming startup ideas into scalable, market-ready Minimum Viable Products rapidly, enabling founders to validate and raise funding effectively.',
      features: ['Rapid Prototyping', 'Scalable Architecture', 'Firebase / Supabase Backend', 'Payment Gateway Setup'],
    },
    {
      icon: 'fas fa-layer-group',
      title: 'App Architecture & Consulting',
      badge: 'Engineering',
      description:
        'In-depth code audits, performance tuning, state management structuring (Redux / Zustand), and architectural advisory for growing teams.',
      features: ['Code Auditing', 'State Management', 'CI/CD Automation', 'Performance Optimization'],
    },
    {
      icon: 'fas fa-paint-brush',
      title: 'UI/UX & Interactive Design',
      badge: 'Design to Code',
      description:
        'Crafting modern, intuitive mobile interfaces from Figma/Adobe XD designs with micro-animations, glassmorphism, and responsive layouts.',
      features: ['Figma to React Native', 'Interactive Prototypes', 'Design Systems', 'Accessibility (a11y)'],
    },
    {
      icon: 'fas fa-cloud',
      title: 'Cloud & API Integration',
      badge: 'Full-Stack',
      description:
        'Seamless integration of secure RESTful and GraphQL APIs, AWS cloud services, real-time sockets, and push notification infrastructure.',
      features: ['AWS & Cloud Architecture', 'Real-time WebSockets', 'Push Notifications', 'Third-Party SDKs'],
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'App Maintenance & Scaling',
      badge: 'Support',
      description:
        'Continuous performance monitoring, OS upgrade compatibility, security patching, and scaling your app to handle millions of active users.',
      features: ['OS Version Compatibility', 'Bug Fixing & Monitoring', 'Database Optimization', '24/7 Availability Support'],
    },
  ];

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const targetElement = document.querySelector('#contact');
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
    <section id="services" className="services">
      <div className="container">
        <div className="section-header-block">
          <div className="agency-badge">
            <span className="pulse-dot"></span>
            <span>DNK Labs • Solutions & Expertise</span>
          </div>
          <h2 className="section-title">Services & Solutions</h2>
          <p className="section-subtitle">
            As Co-Founder at <strong>DNK Labs</strong>, I deliver high-impact digital products, robust mobile architectures, and tailor-made software solutions for modern businesses.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-top">
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <span className="service-badge">{service.badge}</span>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx}>
                    <i className="fas fa-check-circle"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="services-cta-banner">
          <div className="cta-banner-content">
            <div className="cta-banner-text">
              <h3>Have an ambitious idea or mobile project?</h3>
              <p>Partner with DNK Labs to build fast, scalable, and beautifully designed digital products.</p>
            </div>
            <a href="#contact" className="cta-button primary" onClick={handleScrollToContact}>
              <span>Start a Project with DNK Labs</span>
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
