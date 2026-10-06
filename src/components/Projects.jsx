export default function Projects() {
  const projects = [
    {
      title: 'E-Commerce Mobile App',
      description:
        'A full-featured e-commerce application with real-time inventory management, payment integration, and push notifications. Built with React Native and Firebase.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
      tags: ['React Native', 'Firebase', 'Redux'],
      liveDemo: '#',
      sourceCode: '#',
      featured: true,
    },
    {
      title: 'Fitness Tracker App',
      description:
        'Cross-platform fitness tracking app with workout plans, progress charts, and social features. Integrated with device health sensors.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      tags: ['React Native', 'HealthKit', 'Charts'],
      liveDemo: '#',
      sourceCode: '#',
      featured: false,
    },
    {
      title: 'Food Delivery App',
      description:
        'Real-time food delivery application with live tracking, payment integration, and restaurant management system.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      tags: ['React Native', 'Maps', 'Real-time'],
      liveDemo: '#',
      sourceCode: '#',
      featured: false,
    },
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="project-grid">
          {projects.map((project, idx) => (
            <div
              className={`project-card ${project.featured ? 'featured' : ''}`}
              key={idx}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-overlay">
                  <div className="project-tech">
                    {project.tags.map((tag, tagIdx) => (
                      <span className="tech-tag" key={tagIdx}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-links">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    Live Demo
                  </a>
                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <i className="fab fa-github"></i>
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
