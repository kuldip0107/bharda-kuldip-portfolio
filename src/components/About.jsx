export default function About() {
  const stats = [
    { number: '50+', label: 'Apps & Solutions Built' },
    { number: '3+', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <div className="about-intro">
              <p className="lead">
                I'm a passionate <strong>React Native Developer & Co-Founder at DNK Labs</strong> with over 3 years of experience building cross-platform mobile applications and modern digital solutions.
              </p>
              <p>
                At <strong>DNK Labs</strong>, we help startups, businesses, and founders build market-ready mobile apps, scalable architectures, and seamless digital products. My journey combines deep technical engineering with product leadership, ensuring every app is performant, beautiful, and built to scale.
              </p>
            </div>

            <div className="about-stats">
              {stats.map((stat, index) => (
                <div className="stat-item" key={index}>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
