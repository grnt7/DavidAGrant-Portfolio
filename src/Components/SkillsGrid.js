import { useState, useEffect } from 'react';
import './SkillsGrid.css'; // CSS in same folder

const SkillsGrid = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/resumeData.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Fetched data:', data); // Add this
       setSkills(data.resume.skills || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err); // Add this
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading skills...</p>;
  if (error) return <p>Error loading skills: {error}</p>;

  return (
    <div className="skills-grid">
      {skills.map((skill, index) => (
        <div key={index} className="skill-card">
          <i className={`${skill.iconClass} colored`} style={{ fontSize: '40px' }}></i>
          <span>{skill.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SkillsGrid;


