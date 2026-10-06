import { useState, useEffect, useRef } from 'react';

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  const skillCategories = [
    {
      category: 'Mobile Development',
      skills: [
        { name: 'React Native', icon: 'fab fa-react', level: 95 },
        { name: 'JavaScript', icon: 'fab fa-js-square', level: 90 },
        { name: 'iOS Development', icon: 'fab fa-swift', level: 85 },
        { name: 'Android Development', icon: 'fab fa-android', level: 85 },
      ],
    },
    {
      category: 'Technologies & Tools',
      skills: [
        { name: 'AWS', icon: 'fas fa-cloud', level: 80 },
        { name: 'JavaScript', icon: 'fab fa-js-square', level: 80 },
        { name: 'TypeScript', icon: 'fas fa-code', level: 88 },
        { name: 'Expo/Cli', icon: 'fas fa-mobile-alt', level: 92 },
      ],
    },
  ];

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((group, groupIdx) => (
            <div className="skill-category" key={groupIdx}>
              <h3>{group.category}</h3>
              <div className="skill-items">
                {group.skills.map((skill, skillIdx) => (
                  <div className="skill-item" key={skillIdx}>
                    <div className="skill-info">
                      <div className="skill-title">
                        <i className={skill.icon}></i>
                        <span>{skill.name}</span>
                      </div>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-level">
                      <div
                        className="skill-bar"
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
